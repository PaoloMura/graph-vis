import importlib
import json

import networkx as nx

import nx2c
from question import Question


# Teacher Functions

def upload_question(teacher: str, lesson: str, question: str) -> None:
    pass


def edit_question(teacher: str, lesson: str, question: str):
    pass


def delete_question(teacher: str, lesson: str, question: str):
    pass


# Student Functions

def load_question(teacher: str, file: str, question: str) -> Question:
    # TODO: add handling for modules/classes not found errors
    filepath = f"src.teachers.{teacher}.questions.{file}"
    importlib.invalidate_caches()
    try:
        mod = importlib.import_module(filepath)
        try:
            cls = getattr(mod, question)
        except AttributeError as e:
            raise e
        obj = cls()
        return obj
    except ModuleNotFoundError as e:
        raise e


def get_lesson(teacher: str, lesson: str):
    # TODO: send json over HTTP
    with open(f"teachers/{teacher}/topics/{lesson}.json", "r") as f:
        data = json.load(f)
        with open('sample_topic.json', 'w') as g:
            json.dump(data, g)


def get_question(teacher: str, file: str, question: str):
    # TODO: pack graph and qtn into json and send over HTTP
    q = load_question(teacher, file, question)
    graph = q.generate_graph()
    qst = q.generate_question()
    nx2c.export_graph(graph)
    nx2c.export_question(qst)


def get_answer(teacher: str, file: str, question: str, graph: nx.Graph, solution: list[int]):
    q = load_question(teacher, file, question)
    success = q.verify_solution(graph, solution)
    message = q.generate_answer(graph, solution)


# Server

def main():
    get_lesson('paolo', 'walks')
    get_question('paolo', 'euler_walk', 'EulerWalk')


if __name__ == '__main__':
    main()
