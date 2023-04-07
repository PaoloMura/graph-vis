import random
from pprint import pprint

from data.graphquest.question import *
from data.graphquest.graph import *
import networkx as nx

# Questions:
'''
[x] MinSpanTree(QMultipleChoice) - what is the weight of the minimum spanning tree
[x] DFS (QVertexSet) - select the vertex that will be visited 6th in a DFS
[x] Distance (QTextInput) - what is the distance between 2 vertices
[x] EulerWalk(QSelectPath) - find an Euler walk in the graph
[x] VertexSet(QMultipleChoice) - which of the options are vertex covers 
[ ] AugmentingPath(QSelectPath/QMultipleChoice) - find an augmenting path / which is not an augmenting path
[x] MaximumMatching(QTextInput) - how large is the maximum matching for the graph
'''

# TODO:
#   MCQ/SelPat: augmenting path

'''
question types:
- TextInput /
- MCQ /
- SelectPath /
- VertexSet /
- EdgeSet

graphs:
- force-directed /
- circular /
- bipartite /
- weighted /
- directed
'''


def valid_connectivity(graph, be_connected):
    """
    Determine whether the graph satisfies the connectivity constraint.

    :param: be_connected: True if you want the graph to be connected, False otherwise
    :returns: True if the graph's connectivity is as desired
    """
    connected = nx.is_connected(graph)
    return not (connected ^ be_connected)


class MinSpanTree(QMultipleChoice):
    def __init__(self):
        super().__init__(
            node_prefix='v',
            label_style='math',
            single_selection=True,
            layout='force-directed',
            feedback=True
        )
        self.n = 8
        self.p = 0.3
        self.w_min = 1
        self.w_max = 3

    def generate_data(self) -> list[nx.Graph]:
        # With probability 1/5, choose a disconnected graph.
        want_connected = random.random() > 0.2

        # Generate the random graph.
        if want_connected:
            graph = random_planar_graph(self.n, connected=want_connected, s=0.4)
        else:
            graph = nx.gnp_random_graph(n=self.n, p=self.p, directed=False)
            while not valid_connectivity(graph, want_connected):
                graph = nx.gnp_random_graph(n=self.n, p=self.p, directed=False)

        # Randomly assign weights to each edge.
        weights = {(i, j): random.randint(self.w_min, self.w_max) for (i, j) in graph.edges}
        nx.set_edge_attributes(graph, values=weights, name='weight')
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return f'Consider the {self.n}-vertex weighted graph G1.\n\n' \
               'What is the weight of a minimum spanning tree of G1?'

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[str, bool]]:
        connected = nx.is_connected(graphs[0])

        tree = nx.minimum_spanning_tree(graphs[0])
        weight = tree.size(weight='weight')

        # Choose a position for the correct answer.
        # If -1, its value will be 1 less than the smallest option.
        # If 3, its value will be 1 more than the highest option.
        # Each option's value increments by 1.
        pos = random.choices([-1, 0, 1, 2, 3], weights=[1, 2, 2, 2, 1])[0]
        values = [str(int(weight + i - pos)) for i in range(3)]

        # There's a 1/5 probability of each option being correct.
        self.data = [
            [values[0], connected and pos == 0],
            [values[1], connected and pos == 1],
            [values[2], connected and pos == 2],
            ["G1 doesn't have a minimum spanning tree.", not connected],
            ["None of the above.", connected and pos in [-1, 3]]
        ]
        return self.data

    def verify_answer(self, graphs: list[nx.Graph], answer: str) -> bool:
        for i, (_, the_answer) in enumerate(self.data):
            if answer[i][1] != the_answer:
                return False
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: str) -> str:
        for i, (option, the_answer) in enumerate(self.data):
            if the_answer:
                if answer[i][1]:
                    return ''
                elif 0 <= i < 3:
                    return f'The answer is {option}'
                elif i == 3:
                    return "G1 is not connected, so can't have a minimum spanning tree."
                else:
                    tree = nx.minimum_spanning_tree(graphs[0])
                    weight = tree.size(weight='weight')
                    return f'G1 actually has a minimum spanning tree of weight {int(weight)}'


class DFS(QVertexSet):
    def __init__(self):
        super().__init__(node_prefix='v', label_style='math', selection_limit=1)

    def generate_data(self) -> list[nx.Graph]:
        n = random.randint(8, 10)
        p = 0.3
        graph = nx.gnp_random_graph(n=n, p=p, directed=False)
        while not nx.is_connected(graph):
            graph = nx.gnp_random_graph(n=n, p=p, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return 'Consider a depth-first search in the graph G1 starting from vertex 0.\n\n' \
               'Which vertex will be explored sixth? Select the vertex on the graph.\n\n' \
               'Assume that whenever the search has a choice of two or more vertices to visit next, ' \
               'it picks the vertex with lowest number first.'

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[int]]:
        explored = [0 for _ in range(len(graphs[0].nodes))]

        def helper(i):
            if explored[i] == 0:
                explored[i] = 1
                if sum(explored) == 6:
                    return i
                for v in graphs[0].neighbors(i):
                    if not explored[v]:
                        x = helper(v)
                        if x:
                            return x
                return 0

        return [[helper(0)]]

    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        return ''


def distribute_weight(weight: int, size: int) -> list[int]:
    """Distributes the given weight across a list with the given size"""
    weights = []
    while len(weights) < size - 1:
        weights.append(random.randint(1, 1 + weight - sum(weights) - size + len(weights)))
    weights.append(weight - sum(weights))
    return weights


class Distance(QTextInput):
    def __init__(self):
        super().__init__(data_type='integer', label_style='math', node_prefix='v')

    def generate_data(self) -> list[nx.Graph]:
        # Generate a graph with at least 2 paths of length > 1 between nodes 0 and 5
        n = random.randint(7, 9)
        graph = random_planar_graph(n, connected=True, s=0.3)
        paths = list(nx.all_simple_paths(graph, 0, 5))
        while len(paths) < 2 or [0, 5] in paths:
            graph = random_planar_graph(n, connected=True, s=0.3)
            paths = list(nx.all_simple_paths(graph, 0, 5))

        # Find the shortest paths
        paths.sort(key=len)
        shortest_paths = [p for p in paths if len(p) == len(paths[0])]

        # Choose another longer path
        paths = [p for p in paths if len(p) > len(shortest_paths[0])]
        if len(paths) < 1:
            return self.generate_data()
        p = random.choice(paths)
        path_edges = {(p[i], p[i + 1]) if p[i] < p[i + 1] else (p[i + 1], p[i]) for i in range(len(p) - 1)}

        # Assign weights to each edge
        weights = dict()
        for (u, v) in graph.edges:
            if (u, v) in path_edges or (v, u) in path_edges:
                weights[(u, v)] = random.randint(1, 10)
            else:
                weights[(u, v)] = random.randint(11, 20)

        nx.set_edge_attributes(graph, values=weights, name='weight')

        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return 'Consider the weighted graph G1. What is the distance from v0 to v5?'

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[str]:
        sol = nx.shortest_path_length(graphs[0], source=0, target=5, weight='weight')
        return [str(sol)]

    def verify_answer(self, graphs: list[nx.Graph], answer: str) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: str) -> str:
        return ''


class VertexCover(QMultipleChoice):
    def __init__(self):
        super().__init__()

    def generate_data(self) -> list[nx.Graph]:
        n = random.randint(7, 9)
        p = 0.3
        graph = nx.gnp_random_graph(n=n, p=p, directed=False)
        while not nx.is_connected(graph):
            graph = nx.gnp_random_graph(n=n, p=p, directed=False)
        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return 'Which of the following statements are true?'

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[str, bool]]:
        vc = nx.algorithms.approximation.min_weighted_vertex_cover(graphs[0])

        new_graph = graphs[0].copy()
        new_graph.remove_nodes_from(random.choice(list(graphs[0].edges)))
        nvc = nx.algorithms.approximation.min_weighted_vertex_cover(new_graph)

        mis = set(nx.algorithms.maximal_independent_set(graphs[0]))

        solutions = [
            [f'{vc} is a vertex cover of G1', True],
            [f'{nvc} is a vertex cover of G1', False],
            [f'{mis} is an independent set of G1', True]
        ]

        if random.random() > 0.5:
            ais = mis.copy()
            ais.remove(random.choice(list(ais)))
            solutions.append([f'{ais} is an independent set of G1', True])
        else:
            nis = mis.copy()
            v = random.choice(list(set(graphs[0].nodes).difference(nis)))
            nis.add(v)
            solutions.append([f'{nis} is an independent set of G1', False])

        random.shuffle(solutions)
        return solutions

    def verify_answer(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> str:
        return ''


def generate_graph(n):
    graph = nx.algorithms.bipartite.random_graph(n, n, 0.5, directed=False)
    top = [n for n, d in graph.nodes(data=True) if d['bipartite'] == 0]
    result = len(nx.algorithms.bipartite.maximum_matching(graph, top_nodes=top)) / 2
    return graph, result


class MaximumMatching(QTextInput):
    def __init__(self):
        super().__init__(layout='bipartite', data_type='integer')

    def generate_data(self) -> list[nx.Graph]:
        n = random.randint(4, 5)
        p = random.choice(range(n - 2, n))

        graph, result = generate_graph(n)
        while result != p:
            graph, result = generate_graph(n)

        return [graph]

    def generate_question(self, graphs: list[nx.Graph]) -> str:
        return 'What is the size of the maximum matching in G1?'

    def generate_solutions(self, graphs: list[nx.Graph]) -> list[str]:
        top = [n for n, d in graphs[0].nodes(data=True) if d['bipartite'] == 0]
        sol = nx.algorithms.bipartite.maximum_matching(graphs[0], top_nodes=top)
        return [str(int(len(sol) / 2))]

    def verify_answer(self, graphs: list[nx.Graph], answer: str) -> bool:
        return True

    def generate_feedback(self, graphs: list[nx.Graph], answer: str) -> str:
        return ''


if __name__ == '__main__':
    q = MaximumMatching()
    gs = q.generate_data()

    print('edges:')
    pprint(list(gs[0].edges(data=True)))

    s = q.generate_solutions(gs)

    print('solutions:')
    pprint(s)
