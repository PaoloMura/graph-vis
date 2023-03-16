from pprint import pprint

from data.graphquest.question import QSelectPath
import networkx as nx
from random import randint


class EulerWalk(QSelectPath):
    def __init__(self):
        super().__init__()
        self.feedback = True

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

    def __dfs(self, graph: nx.Graph, source: int, visited: list[tuple[int, int]], path: list[int]) -> list[list[int]]:
        neighbors = graph.neighbors(source)
        unvisited = [n for n in neighbors if (source, n) not in visited and (n, source) not in visited]
        # Base case: no unvisited neighbours
        if not unvisited:
            if set(graph.edges) == set(visited):
                return [path.copy()]
            else:
                return []
        # Recursive step: visit the unvisited neighbours
        results = list()
        for node in unvisited:
            edge = [source, node]
            edge.sort()
            visited.append(tuple(edge))
            path.append(node)
            result = self.__dfs(graph, node, visited, path)
            for r in result:
                if r not in results:
                    results.append(r)
            visited.pop()
            path.pop()
        return results

    def generate_solutions(self, graph: nx.Graph) -> list[list[int]]:
        solutions = list()
        for source in graph.nodes:
            solution = self.__dfs(graph, source, [], [source])
            for r in solution:
                if r not in solutions:
                    solutions.append(r)
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
            return "You found a valid Euler walk."
        else:
            path = list(nx.eulerian_path(graph))
            result = list(map(lambda x: x[0], path)) + [path[-1][1]]
            return f'This is not a valid Euler Walk.\n\nOne possible solution is:\n\n{result}'


if __name__ == '__main__':
    q = EulerWalk()
    g = q.generate_data()
    print('graph:')
    print(g.nodes())
    print(g.edges())
    print('Generating solutions...')
    s = q.generate_solutions(g)
    s.sort()
    print('solutions:')
    for sol in s:
        print(sol)
        assert q.verify_answer(g, sol)
    print('All tests pass!')
