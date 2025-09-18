from langgraph.graph import StateGraph, MessagesState, START, END
from langchain_core.messages import HumanMessage
from agent.nodes import llm_call

# Build workflow
agent_builder = StateGraph(MessagesState)

# Add nodes
agent_builder.add_node("llm_call", llm_call)

# Add edges to connect nodes
agent_builder.add_edge(START, "llm_call")
agent_builder.add_edge("llm_call", END)

# Compile the agent
agent = agent_builder.compile()

# # Invoke
# messages = [HumanMessage(content="")]
# messages = agent.invoke({"messages": messages})
# for m in messages["messages"]:
#     m.pretty_print()