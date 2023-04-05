import math
import random
from shapely import *
import networkx as nx
import numpy as np


# Dimensions of the cartesian coordinate space that the nodes occupy
WIDTH = 100
HEIGHT = 100

# Minimum angle allowed between two edges (in radians)
ANGLE_TOLERANCE = (15 / 180) * math.pi


def __random_positions(n: int):
    """Randomly chooses node positions within the coordinate space."""
    nodes = []

    def valid(u):
        for v in nodes:
            if math.dist(u, v) < math.sqrt(WIDTH ** 2 + HEIGHT ** 2) / n:
                return False
        return True

    while len(nodes) < n:
        m = (random.randint(0, WIDTH), random.randint(0, HEIGHT))
        if valid(m):
            nodes.append(m)
    return {i: {'x': m[0], 'y': m[1]} for i, m in enumerate(nodes)}


def random_planar_graph(n: int, connected=True, s=0.3):
    """
    Generate an aesthetically pleasing graph.

    :param n: number of nodes
    :param connected: if True, the graph must be connected, otherwise it may be disconnected
    :param s: a sparseness value between 0 (no edges) and 1 (many edges)
    :return:
    """
    assert n >= 0
    assert 0.0 <= s <= 1.0

    # Set the coordinates of the nodes.
    positions = __random_positions(n)
    cg = nx.complete_graph(n)
    nx.set_node_attributes(cg, positions)

    def coord(v):
        return cg.nodes[v]['x'], cg.nodes[v]['y']

    def dist(e):
        return math.dist(coord(e[0]), coord(e[1]))

    # Sort the edges according to the distance between their endpoints.
    edges = sorted(cg.edges(), key=dist)

    # Construct the final graph.
    result = nx.Graph()

    def coords(e):
        return [coord(e[0]), coord(e[1])]

    def keeps_planarity(new_edge):
        for e in result.edges:
            if e[0] in new_edge or e[1] in new_edge:
                continue
            l0 = LineString(coords(e))
            l1 = LineString(coords(new_edge))
            if l0.intersects(l1):
                return False
        return True

    def vector(v0, v1):
        v = np.array(v1) - np.array(v0)
        return v / np.linalg.norm(v)

    def large_angle(v0, v1):
        if v0 not in result:
            return True
        for v in nx.neighbors(result, v0):
            vec_0 = vector(coord(v0), coord(v))
            vec_1 = vector(coord(v0), coord(v1))
            angle = np.arccos(np.clip(np.dot(vec_0, vec_1), -1.0, 1.0))
            if angle <= ANGLE_TOLERANCE:
                return False
        return True

    def large_angles(new_edge):
        v0, v1 = new_edge
        return large_angle(v0, v1) and large_angle(v1, v0)

    for i, edge in enumerate(edges):
        if keeps_planarity(edge) and large_angles(edge):
            result.add_edge(edge[0], edge[1])
        if result.number_of_nodes() == n and \
                i > s * len(edges) and \
                (not connected or nx.is_connected(result)):
            break

    new_positions = {p: v for p, v in positions.items() if p in result.nodes}
    nx.set_node_attributes(result, new_positions)
    return result
