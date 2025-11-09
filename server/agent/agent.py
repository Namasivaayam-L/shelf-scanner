from langgraph.graph import StateGraph, MessagesState, START, END
from langchain_core.messages import HumanMessage
from agent.nodes import llm_call
from config.logging_manager import get_logger

logger = get_logger()

# Build workflow
logger.info("Building agent workflow")
agent_builder = StateGraph(MessagesState)

# Add nodes
logger.debug("Adding nodes to agent workflow")
agent_builder.add_node("llm_call", llm_call)

# Add edges to connect nodes
logger.debug("Adding edges to agent workflow")
agent_builder.add_edge(START, "llm_call")
agent_builder.add_edge("llm_call", END)

# Compile the agent
logger.info("Compiling agent")
agent = agent_builder.compile()

# # Invoke
# messages = [HumanMessage(content="")]
# messages = agent.invoke({"messages": messages})
# for m in messages["messages"]:
#     m.pretty_print()
