'''
Backend LLMs that can be used generically as basic building blocks for various tasks, e.g. in a chain, a tool for an agent, etc.
'''
import os
from typing import Any
import json

from pydantic import BaseModel
import openai

from utils import struct_to_openai_schema


def set_openai_key(key = None):
    if not key:
        key = os.getenv("OPENAI_API_KEY")
    openai.api_key = key


def get_llm_response(model, messages, stream_handler=None, **kwargs):
    if not stream_handler:
        completion = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            **kwargs
        )
        return completion.choices[0].message
    else:
        raise NotImplementedError

def call_requested_function(call_request, func_lookup):
    # parse function call
    func_name = call_request['name']
    arguments = call_request['arguments']

    if func_name not in func_lookup:
        return f"Error: Function {func_name} does not exist."
    try:
        params = json.loads(arguments)
    except Exception as e:    
        return f"Error: Failed to parse arguments, make sure your arguments is a valid JSON object: {e}"

    # call function
    try:
        return func_lookup[func_name](**params)
    except Exception as e:
        return f"Error: {e}"



class GPT:
    '''Use GPT to answer one-off questions, without a conversation history.'''
    def __init__(self, system="You are a helpful assistant.", model='gpt-3.5-turbo', temperature=1.0):
        self.default_model = model
        self.default_temperature = temperature
        self.default_system = system
    
    def __call__(self, user, system=None, model=None, temperature=None, stream_handler=None):
        if not system:
            system = self.default_system
        assert system, "System prompt not provided"
        model = model or self.default_model
        temperature = temperature or self.default_temperature

        messages = [
            {'role': 'system', 'content': system},
            {'role': 'user', 'content': user}
        ]
        response = get_llm_response(model, messages, stream_handler=stream_handler).content
        return response


class StructGPT(GPT):
    '''Given a pydantic model, use GPT to generate an instance of that model. You can also provide a prompt template, which will be formatted with the kwargs passed to the __call__ method.'''
    def __init__(self, output: BaseModel, prompt_template: str = "", system="Generate JSON objects according to the given schema and user input.", model='gpt-3.5-turbo', temperature=1.0):
        super().__init__(model=model, temperature=temperature, system=system)
        self.output_cls = output
        self.schema = struct_to_openai_schema(output)
        self.prompt_template = prompt_template.strip()

    def __call__(self, max_retries=3, system=None, model=None, temperature=None, stream_handler=None, **kwargs) -> Any:
        if not system:
            system = self.default_system
        assert system, "System prompt not provided"
        model = model or self.default_model
        temperature = temperature or self.default_temperature

        messages = [
            {'role': 'system', 'content': system},
            {'role': 'user', 'content': self.prompt_template.format(**kwargs)}
        ]

        for attempt in range(max_retries):
            response = get_llm_response(model, messages, stream_handler=stream_handler, functions=[self.schema], function_call={'name': self.schema['name']})

            call_request = response.get('function_call')
            assert call_request, "Function call not found in response."
            result = call_requested_function(call_request, {self.schema['name']: self.output_cls})
            if isinstance(result, str): # error, retry
                messages.append({'role': 'function', 'name': call_request['name'], 'content': result})
            elif isinstance(result, self.output_cls):
                return result
            else:
                raise ValueError(f"Unexpected result type: {type(result)}")
        
        raise ValueError(f"Failed to parse response after {max_retries} attempts.")