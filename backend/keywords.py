from collections import defaultdict
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))
additional_filters = {'not_available', 'com', 'chars', 'www', 'http'}
number_words = set(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "zero", "first", "second"])

# Preprocess the item data to get titles
def get_titles(data):
    texts = []
    for category in data: 
        titles = [article['title'] for article in category]
        contents = [article['content'] for article in category]
        texts.extend(titles + contents)
    return texts

# Map Function
def map_function(text): 
    words = re.findall(r'\w+', text.lower())
    filtered_words = [word for word in words if word not in stop_words and not re.match(r'^\d+$', word) and word not in additional_filters and word not in number_words and not word.isdigit()]
    return [(word, 1) for word in filtered_words]

# Shuffle and Sort
def shuffle_and_sort(mapped_values):
    grouped_values = defaultdict(list)
    for pair in mapped_values:
        grouped_values[pair[0]].append(pair[1])
    return grouped_values

# Reduce Function - Implementing a Frequency Threshold
def reduce_function(grouped_values, min_frequency=5):
    reduced_values = {}
    for word, counts in grouped_values.items():
        total_counts = sum(counts)
        if total_counts >= min_frequency:
            reduced_values[word] = total_counts
    return reduced_values

# Driver function (Minor modifications)
def get_analysis(data, n=1, min_frequency=5):
    texts = get_titles(data)
    mapped_values = []
    for text in texts:
        mapped_values.extend(map_function(text))
    
    grouped_values = shuffle_and_sort(mapped_values)
    reduced_values = reduce_function(grouped_values, min_frequency=min_frequency)
    
    return sorted(reduced_values.items(), key=lambda x: x[1], reverse=True)