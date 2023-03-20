import random
from pprint import pprint

from data.graphquest.question import *
import networkx as nx
from random import randint


class Test(QTextInput):
    def __init__(self):
        super().__init__(data_type="integer")

    def generate_data(self) -> list[nx.Graph]:
        n = randint(5, 7)
        p = 4 / n
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        question = """What is the largest degree in this graph?"""
        return question

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[str]:
        deg = max((d for (n, d) in graphs[0].degree))
        return [str(deg)]

    def verify_answer(self, graphs: list[nx.Graph], answer: str) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: str) -> str:
        return ""


class TestMCQ(QMultipleChoice):
    def generate_data(self) -> list[nx.Graph]:
        n = randint(5, 7)
        p = 0.8
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return "Which of the following statements is true?"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[str, bool]]:
        options = list()
        ans1 = len(list(nx.connected_components(graphs[0]))) == 1
        options.append(["The graph is connected", ans1])
        ans2 = min((d for (n, d) in graphs[0].degree)) == 2
        options.append(["The smallest degree in the graph is 2", ans2])
        n = len(list(graphs[0].nodes)) - 1
        ans3 = nx.has_path(graphs[0], 0, n)
        options.append([f"There is a path from v0 to v{n}", ans3])
        return options

    def verify_answer(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> str:
        return ""


class TestMCQ2(QMultipleChoice):
    def __init__(self):
        super().__init__(single_selection=True)

    def generate_data(self) -> list[nx.Graph]:
        n = randint(10, 15)
        p = 0.15
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        n = len(list(graphs[0].nodes)) - 1
        return f"Is there a path from v0 to v{n}?"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[str, bool]]:
        n = len(list(graphs[0].nodes)) - 1
        path_exists = nx.has_path(graphs[0], 0, n)
        return [["Yes", path_exists], ["No", not path_exists]]

    def verify_answer(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> str:
        return ""


class TestVertexSet(QVertexSet):
    def __init__(self):
        super().__init__()

    def generate_data(self) -> list[nx.Graph]:
        n = randint(5, 10)
        p = 0.4
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return "Select all vertices with degree > 2"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[int]]:
        solution = [n for (n, d) in graphs[0].degree if d > 2]
        return [solution]

    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        return ""


class TestSelectVertex(QVertexSet):
    def __init__(self):
        super().__init__(selection_limit=1)

    def generate_data(self) -> list[nx.Graph]:
        n = randint(5, 10)
        p = 0.4
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return "Select a vertex that has exactly two neighbours"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[int]]:
        solution = [[n] for (n, d) in graphs[0].degree if d == 2]
        return solution

    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        return ""


class TestDiGraph(QSelectPath):
    def __init__(self):
        super().__init__()

    def generate_data(self) -> list[nx.Graph]:
        n = 5
        graph = nx.random_k_out_graph(n, 2, 2, self_loops=False)
        while not nx.has_path(graph, 0, n - 1):
            graph = nx.random_k_out_graph(n, 2, 2, self_loops=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        n = len(list(graphs[0].nodes)) - 1
        return f"Find a simple path in the graph from v0 to v{n}"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[list[int]]:
        n = len(list(graphs[0].nodes)) - 1
        solutions = nx.all_simple_paths(graphs[0], 0, n)
        return list(solutions)

    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        return ''


class TestWeighted(QSelectPath):
    def generate_data(self) -> list[nx.Graph]:
        n = randint(5, 10)
        p = 0.4
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        for u, v, d in graph.edges(data=True):
            d['weight'] = round(random.random(), 2)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return "Select an edge with weight < 0.5"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[list[int]]:
        solutions = [[u, v] for u, v, d in graphs[0].edges(data=True) if d['weight'] < 0.5] + \
                    [[v, u] for u, v, d in graphs[0].edges(data=True) if d['weight'] < 0.5]
        return solutions

    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        return ''


class TestMultipleGraphs(QMultipleChoice):
    def __init__(self):
        super().__init__(single_selection=True)

    def generate_data(self) -> list[nx.Graph]:
        n = randint(5, 6)
        p = 0.4
        g1 = nx.gnp_random_graph(n, p, seed=None, directed=False)
        g2 = nx.gnp_random_graph(3, p, seed=None, directed=False)
        return [g1, g2]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return "Is G2 an induced subgraph of G1?"

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[str, bool]]:
        g1 = graphs[0]
        g2 = graphs[1]
        sub = g1.subgraph(g2.nodes)
        is_subgraph = nx.utils.graphs_equal(sub, g2)
        return [
            ["Yes", is_subgraph],
            ["No", not is_subgraph]
        ]

    def verify_answer(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> str:
        return ""


if __name__ == '__main__':
    q = Test()
    g = q.generate_data()
    print('graph:')
    print(g[0].nodes())
    print(g[0].edges())
    print('Generating solutions...')
    s = q.generate_solutions(g)
    print('solutions:')
    for sol in s:
        print(sol)
        assert q.verify_answer(g, sol)
    print('All tests pass!')
