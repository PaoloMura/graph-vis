from pprint import pprint

from data.graphquest.question import QTextInput, QMultipleChoice
import networkx as nx
from random import randint


class Test(QTextInput):
    def __init__(self):
        super().__init__()

    def generate_data(self) -> nx.Graph:
        n = randint(5, 7)
        p = 4 / n
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return graph

    def generate_question(self, graph: nx.Graph) -> str:
        question = """What is the largest degree in this graph?"""
        return question

    def generate_solutions(self, graph: nx.Graph) -> list[str]:
        deg = max((d for (n, d) in graph.degree))
        return [str(deg)]

    def verify_answer(self, graph: nx.Graph, answer: str) -> bool:
        return True

    def generate_feedback(self, graph: nx.Graph, answer: str) -> str:
        return ""


class TestMCQ(QMultipleChoice):
    def generate_data(self) -> nx.Graph:
        n = randint(5, 7)
        p = 0.8
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return graph

    def generate_question(self, graph: nx.Graph) -> str:
        return "Which of the following statements is true?"

    def generate_solutions(self, graph: nx.Graph) -> list[[str, bool]]:
        options = list()
        ans1 = len(list(nx.connected_components(graph))) == 1
        options.append(["The graph is connected", ans1])
        ans2 = min((d for (n, d) in graph.degree)) == 2
        options.append(["The smallest degree in the graph is 2", ans2])
        n = len(list(graph.nodes)) - 1
        ans3 = nx.has_path(graph, 1, n)
        options.append([f"There is a path from v0 to v{n}", ans3])
        return options

    def verify_answer(self, graph: nx.Graph, answer: list[[str, bool]]) -> bool:
        return True

    def generate_feedback(self, graph: nx.Graph, answer: list[[str, bool]]) -> str:
        return ""


if __name__ == '__main__':
    q = Test()
    g = q.generate_data()
    print('graph:')
    print(g.nodes())
    print(g.edges())
    print('Generating solutions...')
    s = q.generate_solutions(g)
    print('solutions:')
    for sol in s:
        print(sol)
        assert q.verify_answer(g, sol)
    print('All tests pass!')
