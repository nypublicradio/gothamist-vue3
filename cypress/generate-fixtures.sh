#!/bin/bash
cd "${0%/*}"

mkdir fixtures/aviary
mkdir fixtures/publisher

# Global
# curl "https://cms.prod.nypr.digital/api/v2/system_messages/2/" > "fixtures/aviary/system_messages.json"
# curl "https://cms.prod.nypr.digital/api/v2/sitewide_components/2/" > "fixtures/aviary/sitewide_components.json"
# curl "https://cms.prod.nypr.digital/api/v2/navigation/1/" > "fixtures/aviary/navigation.json"

# Home Page
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=6" > "fixtures/aviary/latest.json"
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=12" > "fixtures/aviary/latest-plus.json"
curl -L "https://cms.prod.nypr.digital/api/v2/pages/find?html_path=/" > "fixtures/aviary/index.json"
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=6&offset=6" > "fixtures/aviary/index-more.json"

# What's On
curl "https://api.prod.nypr.digital/api/v4/whats_on/?filter\[slug\]=wnyc-fm939&include=current-airing.image,current-show.show.image,current-episode.segments" > "fixtures/publisher/whats_on.json"

#Article Page
curl -L "https://cms.prod.nypr.digital/api/v2/pages/find?html_path=news/extra-extra-meet-connecticuts-answer-to-pizza-rat" > "fixtures/aviary/article.json"

#News Page
curl -L "https://cms.prod.nypr.digital/api/v2/pages/find?html_path=news" > "fixtures/aviary/news-page.json"
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&sponsored_content=false&descendant_of=4&limit=6" > "fixtures/aviary/more-news.json"

#Staff Page
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&author_slug=jen-chung&limit=12&offset=0" > fixtures/aviary/staff-articles.json
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&author_slug=jen-chung&limit=12&offset=12" > fixtures/aviary/staff-more.json

#Section Page
curl  -L "https://cms.prod.nypr.digital/api/v2/pages/find?html_path=news" > fixtures/aviary/section-page.json
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&sponsored_content=false&descendant_of=4&limit=6" > fixtures/aviary/section-recirculation.json
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&sponsored_content=false&descendant_of=4&offset=5" > fixtures/aviary/section-articles.json
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&sponsored_content=false&limit=10&offset=25&descendant_of=4" > fixtures/aviary/section-more.json

#Tag Page
curl  -L "https://cms.demo.nypr.digital/api/v2/pages/find/?html_path=tags/dogs" > fixtures/aviary/tag-page.json
curl "https://cms.demo.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=10&tag_slug=dogs" > fixtures/aviary/tag-articles.json
curl "https://cms.demo.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=10&offset=10&tag_slug=dogs" > fixtures/aviary/tag-more.json
