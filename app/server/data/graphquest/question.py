from abc import ABC, abstractmethod
import networkx as nx


class Question(ABC):
    """
    Methods to implement:

    generate_graph(self) -> nx.Graph
    generate_question(self) -> str
    verify_answer(self, solution: int) -> bool
    generate_feedback(self, graph: nx.Graph, solution: int) -> str
    """
    def __init__(self, layout='force-directed', feedback=False):
        self.layout = layout
        self.feedback = feedback

    @abstractmethod
    def generate_data(self) -> any:
        """
        Generates a NetworkX graph for the question.

        :return: a NetworkX Graph
        """
        raise NotImplementedError

    @abstractmethod
    def generate_question(self, graph: nx.Graph) -> str:
        """
        Generates the wording of the question.

        :param graph: the NetworkX graph used in the question.
        :return: the question description.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_solutions(self, graph: nx.Graph) -> list[any]:
        """
        Generates a set of possible solutions.

        :param graph: the NetworkX graph used in the question.
        :return: a set of possible solutions.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graph: nx.Graph, answer: any) -> bool:
        """
        Checks whether a given solution is correct.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graph: nx.Graph, answer: any) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QSelectPath(Question):
    @abstractmethod
    def generate_data(self) -> nx.Graph:
        """
        Generates a NetworkX graph for the question.

        :return: a NetworkX Graph
        """
        raise NotImplementedError

    @abstractmethod
    def generate_solutions(self, graph: nx.Graph) -> list[list[int]]:
        """
        Generates a set of possible solutions.

        :param graph: the NetworkX graph used in the question.
        :return: a set of possible solutions, lists of vertices.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graph: nx.Graph, answer: list[int]) -> bool:
        """
        Checks whether a given solution is correct.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graph: nx.Graph, answer: list[int]) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QTextInput(Question):
    def __init__(self, data_type='string'):
        super().__init__()
        self.data_type = data_type

    @abstractmethod
    def generate_data(self) -> nx.Graph:
        """
        Generates a NetworkX graph for the question.

        :return: a NetworkX Graph
        """
        raise NotImplementedError

    @abstractmethod
    def generate_solutions(self, graph: nx.Graph) -> list[str]:
        """
        Generates a set of possible solutions.

        :param graph: the NetworkX graph used in the question.
        :return: a set of possible solutions, a list of strings.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graph: nx.Graph, answer: str) -> bool:
        """
        Checks whether a given solution is correct.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer, a string.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graph: nx.Graph, answer: str) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer, a string.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QMultipleChoice(Question):
    def __init__(self, single_selection=False):
        super().__init__()
        self.single_selection = single_selection

    @abstractmethod
    def generate_data(self) -> nx.Graph:
        """
        Generates a NetworkX graph for the question.

        :return: a NetworkX Graph
        """
        raise NotImplementedError

    @abstractmethod
    def generate_solutions(self, graph: nx.Graph) -> list[str]:
        """
        Generates a set of possible solutions.

        :param graph: the NetworkX graph used in the question.
        :return: a set of possible solutions.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graph: nx.Graph, answer: str) -> bool:
        """
        Checks whether a given solution is correct.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graph: nx.Graph, answer: str) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer.
        :return: the message to be displayed.
        """
        raise NotImplementedError


class QVertexSet(Question):
    def __init__(self, selection_limit=-1):
        super().__init__()
        self.selection_limit = selection_limit

    @abstractmethod
    def generate_data(self) -> nx.Graph:
        """
        Generates a NetworkX graph for the question.

        :return: a NetworkX Graph
        """
        raise NotImplementedError

    @abstractmethod
    def generate_solutions(self, graph: nx.Graph) -> list[[int]]:
        """
        Generates a set of possible solutions.

        :param graph: the NetworkX graph used in the question.
        :return: a set of possible solutions, lists of vertices.
        """
        raise NotImplementedError

    @abstractmethod
    def verify_answer(self, graph: nx.Graph, answer: list[int]) -> bool:
        """
        Checks whether a given solution is correct.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: True if the solution is correct, or False otherwise.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_feedback(self, graph: nx.Graph, answer: list[int]) -> str:
        """
        Generates a message to be displayed when the solution has been submitted.

        :param graph: the NetworkX graph used in the question.
        :param answer: the student's choice of answer, a list of vertices.
        :return: the message to be displayed.
        """
        raise NotImplementedError
