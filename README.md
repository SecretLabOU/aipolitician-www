# MagnetDB: A Longitudinal Torrent-Discovery Dataset with IMDb-Matched Movies & TV Shows

Research Team  
Digital Media Research Group, Academic Institution

## Abstract

MagnetDB is a five-year (Dec 2018 – Sep 2024) longitudinal dataset that continuously captures torrents discovered through the BitTorrent Distributed Hash Table (DHT). It indexes **28.6 million torrents, 950 million files, and 82.9 PB of content**, and enriches 1.56 million video files (≈ 751k movies, 811k TV episodes) with IMDb identifiers.

By exposing granular supply-side metadata—including release-group "encoders," distribution "sites," file-level tags, and cross-referenced IMDb attributes—MagnetDB enables new empirical work on piracy dynamics, cultural diffusion, and P2P ecosystem evolution. The dataset is released under a CC BY 4.0 licence and follows FAIR principles; magnet links are provided to accredited researchers on request.

## Overview

MagnetDB is a comprehensive longitudinal dataset that captures the supply-side dynamics of the BitTorrent ecosystem. Unlike previous datasets that focus on download behavior, MagnetDB captures who uploads what content, enabling research on release-group behavior, gift-economy incentives, and subcultural norms in digital piracy.

## Key Features

| Feature                                                         | Why it matters                                                                                                                                        |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Longitudinal coverage (2018-2024, 300 weeks, 93.7% uptime)** | Supports time-series analyses of supply trends and policy interventions.                                                                              |
| **Scale: 28.6M torrents / 950M files / 82.9PB**              | Orders of magnitude larger than prior open torrent datasets; suitable for large-scale ML and statistical studies.                                     |
| **Supply-side focus**                                           | Captures who uploads what, not merely who downloads, enabling research on release-group behaviour, gift-economy incentives, and subcultural norms.  |
| **Rich, structured metadata**                                   | Extracts >40 attributes (quality, language, codec, resolution, release group, etc.) from Scene-style file names.                                      |
| **IMDb matching (1.56M files above 2σ BM25 threshold)**       | Adds title, year, genre, ratings, cast, runtime—linking BitTorrent supply to mainstream media databases.                                              |
| **FAIR distribution (OSF DOI + AcademicTorrents)**              | Persistent identifiers, open formats (SQLite + CSV), annual updates, and documented provenance.                                                       |

## System Architecture

MagnetDB is built on a robust data collection and processing pipeline:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   DHT Crawler   │    │   File Parser   │    │   IMDb Matcher  │
│   (magnetico)   │◄──►│   (Scene Rules) │◄──►│   (Elasticsearch)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Raw Torrents  │    │   Metadata DB   │    │   Matched Data  │
│   & Magnet URIs │    │   (SQLite)      │    │   (CSV/SQLite)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Methodology

### 1. DHT Crawling

- Deployed the open-source **magnetico** crawler on self-hosted infrastructure
- Parameter `indexer-max-neighbors=10000` maintained concurrent queries to 10k peers
- Achieved 93.7% uptime over 300 weeks
- Burn-in phase captured historic torrents, followed by steady-state ingestion

### 2. Torrent & File Parsing

- Identified video files via extensions
- Applied Scene naming conventions (scenerules.org) to parse titles and >40 metadata tags
- Mean 33.2 files per torrent
- Encoded 86.6M video files, discarding 8.6M with hash or encoding errors

### 3. IMDb Title Matching

- Loaded IMDb Non-Commercial Dataset into Elasticsearch with custom edge-ngram analyser (4–15 grams)
- Queried each candidate title, ranked by BM25
- Adopted conservative 2σ cut-off (score ≥ 138) to minimise false positives
- Retained 1.81% of video files (1.56M matches)

### 4. Data Packaging & Release

- Stored raw torrents, parsed metadata, and matched subsets in SQLite
- Provided slim CSVs for quick start
- Public release omits magnet URIs; researchers can request full version under controlled access

## Results & Impact

### Selective Coverage Insight
Despite its size, MagnetDB covers < 5% of IMDb titles for most release years, revealing that only a fraction of global media is ever torrented; coverage spikes for culturally salient eras (e.g., 1940s classics).

### Encoder & Site Ecology
A small number of elite release groups (e.g., RARBG, YTS, ION10) dominate supply, confirming the persistence of Scene hierarchies and gift-economy prestige incentives.

### Streaming-Service Targeting
Amazon MGM, Netflix, BBC, Disney+, Hulu, and HBO Max titles appear most frequently, highlighting how exclusivity and regional licensing drive piracy supply.

### Cross-disciplinary Utility
Already cited by the Kiwi Torrent Research corpus and positioned for:

- **Cultural analytics**: linguistic diffusion, fan-sub activity, temporal popularity arcs
- **Policy & enforcement**: evaluating takedown efficacy, modelling release-window effects
- **Security**: malware risk in software torrents; comparative studies of emerging P2P platforms (IPFS, Filecoin)

## Dataset Statistics

| Metric | Value |
|--------|-------|
| **Torrents** | 28.6 million |
| **Files** | 950 million |
| **Content Volume** | 82.9 PB |
| **IMDb-Matched Videos** | 1.56 million |
| **Coverage Period** | 300 weeks (Dec 2018 – Sep 2024) |
| **Uptime** | 93.7% |

## Usage

### Getting Started
Visit [magnetdb.org](https://magnetdb.org) to access:
- Download links and schema diagrams
- Python/R notebooks for common queries
- Documentation and tutorials

### Data Access
```python
import pandas as pd

# Load IMDb-matched video data
videos = pd.read_csv('magnetdb_imdb_matched.csv')

# Filter by streaming service
netflix_titles = videos[videos['release_group'].str.contains('NETFLIX', na=False)]

# Analyze temporal trends
monthly_counts = videos.groupby(pd.to_datetime(videos['discovery_date']).dt.to_period('M')).size()
```

### Reproducible Pipelines
```bash
# Clone the repository
git clone https://github.com/yourusername/magnetdb.git
cd magnetdb

# Run the complete pipeline
snakemake --cores 4

# Or use Docker
docker build -t magnetdb .
docker run -v $(pwd)/data:/app/data magnetdb
```

## Installation

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/magnetdb.git
cd magnetdb

# Install dependencies
pip install -r requirements.txt

# Set up database
python setup_database.py

# Run development server
python app.py
```

### Docker Deployment
```bash
# Build and run with Docker
docker build -t magnetdb .
docker run -p 8000:8000 magnetdb
```

## Data Schema

### Core Tables

**torrents**
- `info_hash`: Unique torrent identifier
- `name`: Torrent name
- `size`: Total size in bytes
- `files_count`: Number of files
- `discovery_date`: When first observed
- `last_seen`: Last observation date

**files**
- `info_hash`: Reference to torrent
- `path`: File path within torrent
- `size`: File size in bytes
- `extension`: File extension
- `parsed_title`: Extracted title from filename
- `quality`: Video quality (1080p, 720p, etc.)
- `codec`: Video codec (HEVC, AVC, etc.)
- `release_group`: Scene release group

**imdb_matches**
- `file_id`: Reference to file
- `imdb_id`: IMDb identifier
- `title`: Movie/TV show title
- `year`: Release year
- `genre`: Primary genre
- `rating`: IMDb rating
- `bm25_score`: Matching confidence score

## API Documentation

Comprehensive API documentation is available at [docs.magnetdb.org](https://docs.magnetdb.org), including:

- **Authentication**: API key management and usage
- **Endpoints**: Complete reference for all API endpoints
- **Examples**: Code examples in Python, JavaScript, and other languages
- **Rate Limits**: Usage guidelines and limitations
- **Error Handling**: Common error codes and troubleshooting

## Contributing

We welcome contributions from the research community:

### Data Contributions
- Submit bug reports for data quality issues
- Suggest improvements to parsing rules
- Help validate IMDb matching accuracy

### Code Contributions
- Report bugs and suggest new features
- Submit pull requests for improvements
- Contribute to documentation and tutorials

### Research Collaboration
- Share research findings and datasets
- Collaborate on new features and capabilities
- Participate in community discussions

## Ethics & Access Control

### Controlled Access
- Public release omits magnet URIs to prevent facilitation of infringement
- Accredited researchers can request full dataset with magnet links
- Access granted based on research proposal and institutional affiliation

### Data Validation
- All data undergoes quality control and validation
- Community review process for data submissions
- Regular audits of matching accuracy and completeness

### Citation Guidelines
- Cite the dataset in all publications using the provided BibTeX
- Acknowledge the research team and funding sources
- Follow responsible data sharing practices

## Citation

If you use MagnetDB in your research, please cite our paper:

```bibtex
@article{magnetdb2024,
  title={MagnetDB: A Longitudinal Torrent-Discovery Dataset with IMDb-Matched Movies & TV Shows},
  author={Research Team},
  journal={arXiv preprint},
  year={2024},
  doi={10.48550/arXiv.XXXX.XXXXX}
}
```

## License

This project is available under the CC BY 4.0 License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Website**: [magnetdb.org](https://magnetdb.org)
- **Email**: contact@magnetdb.org
- **GitHub**: [github.com/yourusername/magnetdb](https://github.com/yourusername/magnetdb)
- **Documentation**: [docs.magnetdb.org](https://docs.magnetdb.org)

## Acknowledgments

We thank the digital media research community for their contributions and feedback. This work was supported by academic research grants and follows responsible data collection practices.
