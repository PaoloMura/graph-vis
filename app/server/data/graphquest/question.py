from abc import ABC, abstractmethod
import networkx as nx


class Question(ABC):
    """
    Methods to implement:

    generate_graph(self) -> nx.Graph

    generate_question(self, graph: nx.Graph) -> str

    generate_solutions(self, graph: nx.Graph) -> list[any]

    verify_answer(self, graph: nx.Graph, answer: any) -> bool

    generate_feedback(self, graph: nx.Graph, answer: any) -> str
    """
    def __init__(self, layout='force-directed', feedback=False, node_prefix='', label_style='none'):
        self.layout = layout
        self.feedback = feedback
        self.node_prefix = node_prefix
        self.label_style = label_style

    @abstractmethod
    def generate_data(self) -> list[nx.Graph]:
        """
        Generates a list of NetworkX graphs for the question.

        :return: a list of NetworkX Graphs
        """
        raise NotImplementedError

    @abstractmethod
    def generate_question(self, graphs: list[nx.Graph]) -> str:
        """
        Generates the wording of the question.

        :param graphs: the NetworkX graphs used in the question.
        :return: the question description.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_solutions(self, graphs: list[nx.Graph]) -> list[any]:
        """
        Generates a set of possible solutions.

        :param graphs: the NetworkX graphs used in the question.
        :return: a set of possible solutions.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graphs: list[nx.Graph], answer: any) -> bool:
        """
        Checks whether a given solution is correct.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graphs: list[nx.Graph], answer: any) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QSelectPath(Question):
    def __init__(self, layout='force-directed', feedback=False, node_prefix='', label_style='none'):
        super().__init__(layout=layout, feedback=feedback, node_prefix=node_prefix, label_style=label_style)

    @abstractmethod
    def generate_solutions(self, graphs: list[nx.Graph]) -> list[list[int]]:
        """
        Generates a set of possible solutions.

        :param graphs: the NetworkX graphs used in the question.
        :return: a set of possible solutions, lists of vertices.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        """
        Checks whether a given solution is correct.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QTextInput(Question):
    def __init__(self, layout='force-directed', feedback=False, node_prefix='', data_type='string', label_style='none'):
        super().__init__(layout=layout, feedback=feedback, node_prefix=node_prefix, label_style=label_style)
        self.data_type = data_type

    @abstractmethod
    def generate_solutions(self, graphs: list[nx.Graph]) -> list[str]:
        """
        Generates a set of possible solutions.

        :param graphs: the NetworkX graphs used in the question.
        :return: a set of possible solutions, a list of strings.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graphs: list[nx.Graph], answer: str) -> bool:
        """
        Checks whether a given solution is correct.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer, a string.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graphs: list[nx.Graph], answer: str) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer, a string.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QMultipleChoice(Question):
    def __init__(self, layout='force-directed', feedback=False, node_prefix='', label_style='none', single_selection=False):
        super().__init__(layout=layout, feedback=feedback, node_prefix=node_prefix, label_style=label_style)
        self.single_selection = single_selection

    @abstractmethod
    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[str, bool]]:
        """
        Generates a set of possible solutions.

        :param graphs: the NetworkX graphs used in the question.
        :return: a set of possible solutions.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> bool:
        """
        Checks whether a given solution is correct.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graphs: list[nx.Graph], answer: list[[str, bool]]) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QVertexSet(Question):
    def __init__(self, layout='force-directed', feedback=False, node_prefix='', label_style='none', selection_limit=-1):
        super().__init__(layout=layout, feedback=feedback, node_prefix=node_prefix, label_style=label_style)
        self.selection_limit = selection_limit

    @abstractmethod
    def generate_solutions(self, graphs: list[nx.Graph]) -> list[[int]]:
        """
        Generates a set of possible solutions.

        :param graphs: the NetworkX graphs used in the question.
        :return: a set of possible solutions, lists of vertices.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graphs: list[nx.Graph], answer: list[int]) -> bool:
        """
        Checks whether a given solution is correct.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graphs: list[nx.Graph], answer: list[int]) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graphs: the NetworkX graphs used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: the message to be displayed.
        """
        raise NotImplementedError
