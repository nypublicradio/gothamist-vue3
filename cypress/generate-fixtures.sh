mkdir fixtures/aviary
mkdir fixtures/publisher

# Global
curl "https://cms.prod.nypr.digital/api/v2/system_messages/2/" > "fixtures/aviary/system_messages.json"
curl "https://cms.prod.nypr.digital/api/v2/sitewide_components/2/" > "fixtures/aviary/sitewide_components.json"

# Home Page
curl "https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=6" > "fixtures/aviary/latest.json"
curl "https://cms.prod.nypr.digital/api/v2/pages/find?html_path=/" > "fixtures/aviary/index.json"
curl "https://cms.demo.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=6&offset=6" > "fixtures/aviary/index-more.json"

# What's On
curl "https://api.prod.nypr.digital/api/v4/whats_on/?filter\[slug\]=wnyc-fm939&include=current-airing.image,current-show.show.image,current-episode.segments" > "fixtures/publisher/whats_on.json"

