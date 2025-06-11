import json
import csv

with open('example_data.json', encoding='utf-8') as f:
    data = json.load(f)

with open('insert_messages.csv', 'w', encoding='utf-8', newline='') as out:
    writer = csv.writer(out)
    writer.writerow([
        'publisheddate', 'keyword', 'engagement_view', 'engagement_comment',
        'engagement_share', 'engagement_like', 'engagement_love',
        'engagement_sad', 'engagement_wow', 'engagement_angry'
    ])
    for item in data:
        if 'publisheddate' not in item:
            continue
        
        date = item['publisheddate'].replace('T', ' ')[:19]
        keyword = item.get('keyword', '')
        row = [
            date,
            keyword,
            item.get('engagement_view', 0),
            item.get('engagement_comment', 0),
            item.get('engagement_share', 0),
            item.get('engagement_like', 0),
            item.get('engagement_love', 0),
            item.get('engagement_sad', 0),
            item.get('engagement_wow', 0),
            item.get('engagement_angry', 0),
        ]
        writer.writerow(row)