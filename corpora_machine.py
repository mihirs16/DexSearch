import pandas as pd
import re

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
nltk.download('stopwords')
nltk.download('wordnet')

def remove_stopwords(text):
  stop_words = set(stopwords.words('english'))
  no_stopword_text = [w for w in text.split() if not w in stop_words]
  return ' '.join(no_stopword_text)

lemmatizer = WordNetLemmatizer()
def clean_text (text):
  text = re.sub("\'", "", text) 
  text = re.sub("[^a-zA-Z]"," ",text) 
  text = ' '.join(text.split()) 
  text = text.lower()
  _t = ""
  for t in text.split():
      _t += lemmatizer.lemmatize(t, pos='n') + " "
  return remove_stopwords(_t)

def get_keywords (text):
  cleaned_text = clean_text(text)
  return cleaned_text.split()

def build_corpora_from_excel(_path):
    df = pd.read_excel(_path)
    df.dropna(axis=0, inplace=True)
    df.reset_index(inplace=True)
    df.drop([df.columns[0]], axis=1, inplace=True)
    for i in range(df.shape[0]):
        df['Description'].loc[i] = df['Description'].loc[i].replace('\n', ' ')
    tok_title = [get_keywords(doc) for doc in df.Opportunity.values]
    tok_descr = [get_keywords(doc) for doc in df.Description.values]
    return tok_title, tok_descr, df



