import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.models.phrases import Phrases, Phraser
import numpy as np
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

additional_filters = {'not_available', 'com', 'chars', 'www', 'http', 'bbc', 
                      'forbes','one','two','three','first','last','new','news','fox',
                      'next','year','today','health','sports','business',
                      'athletic'}

# Preprocess the item data to get titles and contents
def get_texts(data):
    texts = []
    for category in data: 
        titles = [article['title'] for article in category]
        contents = [article['content'] for article in category]
        texts.extend(titles + contents)
    return texts

# Preprocessing and phrase detection
def preprocess_and_detect_phrases(texts):
    # Basic preprocessing
    texts = [[word for word in re.findall(r'\w+', text.lower()) 
              if word not in stop_words and not word.isdigit() 
              and word not in additional_filters] for text in texts]
    
    # Phrase detection
    phrases = Phrases(texts, min_count=5, threshold=10)
    phraser = Phraser(phrases)
    phrased_texts = [' '.join(phraser[text]) for text in texts]
    
    return phrased_texts

# TF-IDF Vectorization and Analysis
def analyze_texts(phrased_texts, top_n=20):
    vectorizer = TfidfVectorizer(max_features=1000, ngram_range=(1, 3), min_df=3, max_df=0.5)
    tfidf_matrix = vectorizer.fit_transform(phrased_texts)
    feature_names = np.array(vectorizer.get_feature_names_out())

    # Calculate average TF-IDF score for each term across all documents
    average_tfidf_scores = np.mean(tfidf_matrix.toarray(), axis=0)

    sorted_indices = np.argsort(average_tfidf_scores)[::-1]
    sorted_features = feature_names[sorted_indices]
    sorted_scores = average_tfidf_scores[sorted_indices]

    # Extract top n features and their scores
    top_features = [(feature, score) for feature, score in zip(sorted_features, sorted_scores)][:top_n]
    formatted_list = [{"text": text, "value": value} for text, value in top_features]
    return formatted_list

# Driver function
def get_analysis(data, top_n=20):
    texts = get_texts(data)
    phrased_texts = preprocess_and_detect_phrases(texts)
    return analyze_texts(phrased_texts, top_n=top_n)
