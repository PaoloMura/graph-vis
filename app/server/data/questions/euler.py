from data.graphquest.question import QSelectPath
import networkx as nx
from random import randint


class EulerWalk(QSelectPath):
    def __init__(self):
        super().__init__()

    def generate_data(self) -> nx.Graph:
        # n = randint(5, 10)
        n = 5
        p = 2 / n
        graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        while not nx.is_eulerian(graph):
            graph = nx.gnp_random_graph(n, p, seed=None, directed=False)
        return graph

    def generate_question(self, graph: nx.Graph) -> str:
        question = """Find an Euler walk in the graph.\n\nSelect vertices in order."""
        return question

    def generate_solutions(self, graph: nx.Graph) -> set[list[int]]:
        # This has time complexity O(n!), so is a case where you either
        # want to only generate small graphs, or use the verification functions instead
        solutions = set()
        for source in graph.nodes():
            for target in graph.nodes():
                for path in nx.all_simple_paths(graph, source=source, target=target):
                    if self.verify_answer(graph, path):
                        solutions.add(path)
        return solutions

    def verify_answer(self, graph: nx.Graph, solution: list[int]) -> bool:
        graph = graph.copy()
        for i in range(len(solution) - 1):
            v1 = solution[i]
            v2 = solution[i+1]
            if graph.has_edge(v1, v2):
                graph.remove_edge(v1, v2)
            else:
                return False
        return nx.is_empty(graph)

    def generate_feedback(self, graph: nx.Graph, solution: list[int]) -> str:
        if self.verify_answer(graph, solution):
            return "Correct!"
        else:
            path = list(nx.eulerian_path(graph))
            result = list(map(lambda x: x[0], path)) + [path[-1][1]]
            return f'Incorrect.\n\nOne possible solution is:\n\n{result}'
