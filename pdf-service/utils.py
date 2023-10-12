import jsonref
from typing import Type
from pydantic import BaseModel

# recursively remove 'title' keys from schema
def remove_title(d) -> dict | list:
    if isinstance(d, dict):
        if 'title' in d and type(d['title']) == str:
            d.pop('title')
        for v in d.values():
            remove_title(v)
    elif isinstance(d, list):
        for v in d:
            remove_title(v)
    return d

def to_nested_schema(model: Type[BaseModel], no_title=True) -> dict:
    '''nested json schema rather than refs'''
    schema = jsonref.loads(model.schema_json(), proxies=False)
    if 'definitions' in schema:
        schema.pop('definitions')
    if no_title:
        remove_title(schema)
    return schema

def struct_to_openai_schema(schema: dict | Type[BaseModel]) -> dict:
    if issubclass(schema, BaseModel):
        schema = to_nested_schema(schema, no_title=False)

    # Convert properties
    remove_title(schema['properties'])

    # Construct the OpenAI schema format
    return {
        'name': schema.get('title', ''),
        'description': schema.get('description', ''),
        'parameters': {
            'type': 'object',
            'properties': schema['properties'],
            'required': schema.get('required', [])
        }
    }