from rank_bm25 import BM25Okapi
import pandas as pd
import corpora_machine
import numpy as np 

tok_title, tok_descr, df = corpora_machine.build_corpora_from_excel('DexData.xlsx')
bm25_title = BM25Okapi(tok_title)
bm25_descr = BM25Okapi(tok_descr)


def search(query, tok_title=tok_title, tok_descr=tok_descr, corpus=df, bm25_title=bm25_title, bm25_descr=bm25_descr):
    
    tokenized_query = corpora_machine.get_keywords(query)
    title_scores = bm25_title.get_scores(tokenized_query)
    descr_scores = bm25_descr.get_scores(tokenized_query)
    n_to_retrieve_title = 0
    for i in title_scores:
        if i != 0:
            n_to_retrieve_title = n_to_retrieve_title + 1
    n_to_retrieve_descr = 0
    for i in title_scores:
        if i != 0:
            n_to_retrieve_descr = n_to_retrieve_descr + 1
    results_title = bm25_title.get_top_n(tokenized_query, corpus.Opportunity.values, n=n_to_retrieve_title)
    results_description = bm25_descr.get_top_n(tokenized_query, corpus.Description.values, n=n_to_retrieve_descr)
    results_index = []
    for r in results_title:
        this_index = list(corpus.Opportunity.values).index(r)
        results_index.append(this_index)
    for r in results_description:
        this_index = list(corpus.Description.values).index(r)
        if this_index not in results_index:
            results_index.append(this_index)
    results = []
    for i in results_index:
        this_opp = {
            'title': df.loc[i].Opportunity,
            'desc': df.loc[i].Description,
            'demo': df.loc[i].Demographic.split(', '),
            'link': df.loc[i].Links
        }
        results.append(this_opp)
    return results