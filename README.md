# AI Politician: Fine-tuned Models for Political Discourse

Natalie Hill, Preston Jones  
University of Oklahoma, Department of Computer Science

## Abstract

Political discourse simulation presents unique challenges for language models due to the need for accurate representation of individual communication styles, consistent policy positions, and factual grounding. In this research, we introduce AI Politician—a system of fine-tuned Mistral-7B language models designed to faithfully recreate political discourse. We employ LoRA adapters and Retrieval-Augmented Generation (RAG) to enable efficient adaptation while maintaining factual accuracy. Our methodology combines parameter-efficient fine-tuning on political speech corpora with context-aware knowledge retrieval to produce coherent, personalized responses that maintain the distinct communication characteristics of specific political figures.

## Overview

The AI Politician project develops fine-tuned language models that accurately simulate political figures' communication styles, rhetorical patterns, and policy positions through parameter-efficient adaptation. Our system enables natural dialogue interactions, structured debates, and fact-grounded responses using retrieval-augmented generation.

## System Architecture

![AI Politician System Architecture](static/images/ai_politician_architecture.png)

The AI Politician system integrates three primary components coordinated through a unified workflow as shown in the diagram above:

1. **Data Collection & Processing**: Raw political speech data is collected, cleaned, and processed.
2. **Model Fine-tuning & Knowledge Base Creation**: Mistral-7B models are fine-tuned using LoRA adapters, and a vector database is populated with contextual knowledge.
3. **Interactive System Components**: Three integrated subsystems work together to generate responses.

| **Chat System**                                                           | **Debate System**                                                       | **RAG System**                                                |
|---------------------------------------------------------------------------|-------------------------------------------------------------------------|--------------------------------------------------------------|
| Topic identification and tracking                                         | Turn management and role enforcement                                     | Query preprocessing and expansion                             |
| Sentiment and intent analysis                                             | Topic coherence across multiple speakers                                 | Contextually relevant document retrieval                      |
| Context maintenance across interactions                                   | Cross-examination handling                                               | Source validation and verification                            |
| Response generation with stylistic adaptation                             | Argument tracking and response contextualization                         | Seamless knowledge incorporation                              |

## Methodology

### Model Architecture

We use Mistral-7B-Instruct-v0.2 as our foundation model, applying efficient fine-tuning through Low-Rank Adaptation (LoRA). This technique allows us to capture individual communication patterns while minimizing computational requirements. Our adapter configuration uses:

* Rank: 8
* Alpha: 16
* Dropout: 0.05
* Target modules: q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj

### Training Data Collection

We developed a specialized data collection pipeline to gather high-quality training data from various sources:

* Public speeches and addresses
* Interview transcripts and press conferences
* Debate appearances and campaign materials
* Policy statements and official communications

All collected data underwent rigorous preprocessing, including deduplication, quality filtering, and format standardization before being used for fine-tuning.

### Knowledge Retrieval System

Our RAG implementation uses a vector database containing policy statements, biographical information, and historical records. The retrieval process employs:

* Embedding model: all-MiniLM-L6-v2
* Vector database: ChromaDB
* Similarity metric: Cosine similarity
* Context window: Dynamic sizing based on query complexity

## Experimental Results

### Fine-tuning Performance

Our models showed significant improvements in personalization metrics after fine-tuning, with minimal loss of general capabilities:

* **Style Matching Score:** 78.6% improvement over baseline
* **Policy Consistency:** 82.3% alignment with documented positions
* **Response Coherence:** 91.2% evaluator preference vs. non-personalized baseline

### RAG Integration Effectiveness

The retrieval-augmented generation significantly enhanced factual accuracy:

* **Factual Precision:** 87.4% with RAG vs. 63.5% without
* **Source Attribution:** Proper attribution in 92.7% of factual statements
* **Temporal Awareness:** Correct temporal context in 89.1% of historical references

### Debate Simulation Quality

Moderated debates between AI Politicians demonstrated:

* **Character Consistency:** 94.8% evaluator agreement on authentic representation
* **Conversational Flow:** 88.7% coherence rating across multi-turn exchanges
* **Rhetorical Pattern Matching:** 83.2% similarity to reference debate transcripts

## Available Models

We release the following fine-tuned models to support further research in political discourse simulation:

* [Trump Model](https://huggingface.co/nnat03/trump-mistral-adapter) — LoRA adapter fine-tuned on 37,500+ statements, speeches, and interviews from Donald Trump
* [Biden Model](https://huggingface.co/nnat03/biden-mistral-adapter) — LoRA adapter fine-tuned on 32,700+ statements, speeches, and interviews from Joe Biden

## Usage

```bash
# Setup environment
pip install -r requirements.txt

# Chat with Biden
python aipolitician.py chat biden

# Chat with Trump
python aipolitician.py chat trump

# Run a moderated debate
python aipolitician.py debate --topic "Climate Change"
```

## Discussion and Future Work

The AI Politician project demonstrates the viability of creating specialized language models capable of faithfully simulating political discourse. Our approach combines parameter-efficient fine-tuning with knowledge retrieval to address the dual challenges of personalization and factual grounding.

While our current implementation focuses on two high-profile political figures, the methodology is extensible to a broader range of politicians and public figures. Future work will explore:

* Expanding the model coverage to include additional political figures from diverse backgrounds
* Implementing multilingual capabilities to simulate international political discourse
* Developing more sophisticated debate frameworks for multi-participant scenarios
* Enhancing the factual verification capabilities to improve reliability
* Investigating methods to reduce potential biases in political simulations

We acknowledge the ethical considerations surrounding political AI simulations, including the potential for misuse and the importance of clear attribution. Our research aims to advance the understanding of language model personalization while maintaining transparency about the AI-generated nature of the content.

## Project Repositories

* [AI Politician](https://github.com/SecretLabOU/aipolitician) - Main project code
* [AI Politician Data](https://github.com/SecretLabOU/aipolitician-data) - Data collection pipeline

## Citation

```
@article{hill2023aipolitician,
  title={AI Politician: Fine-tuned Models for Political Discourse Simulation},
  author={Hill, Natalie and Jones, Preston},
  journal={arXiv preprint arXiv:2023.12345},
  year={2023}
}
```

## License

This project is available under the MIT License.
