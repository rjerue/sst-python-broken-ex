import json
from src.db.notes import getNotes

def main(event, context):
  return {
    "statusCode": 200,
    "body": json.dumps(getNotes(), indent=2)
  }
