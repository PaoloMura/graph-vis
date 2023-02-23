import json
import networkx as nx


def export_graph(graph: nx.Graph, weighted=False, directed=False):
    """
    Exports the given NetworkX graph to a JSON file called 'graph_init.json' for Cytoscape.

    :param graph: a NetworkX graph
    :param weighted: true if edges have weights, false otherwise
    :param directed: true if graph is directed, false otherwise
    """
    data = nx.cytoscape_data(graph)

    for edge in data['elements']['edges']:
        id = f"{edge['data']['source']}-{edge['data']['target']}"
        edge['data'].update({'id': id, 'weight': '0'})
        classes = []
        if weighted:
            classes.append('weighted')
        if directed:
            classes.append('directed')
        edge['classes'] = ' '.join(classes)

    json_data = json.dumps(data)
    with open("sample_graph.json", "w") as outfile:
        outfile.write(json_data)


def export_question(question: str):
    data = {'description': question}
    json_data = json.dumps(data)
    with open("sample_question.json", "w") as outfile:
        outfile.write(json_data)


def export_answer(result: bool, explanation: str):
    data = {'result': result, 'explanation': explanation}
    json_data = json.dumps(data)
    with open("sample_answer.json", "w") as outfile:
        outfile.write(json_data)
