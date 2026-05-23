# SEO Starter Guide: The Basics | Google Search Central

# Search Engine Optimization (SEO) Starter Guide


When you built your website, you likely created it with your users in mind, trying to make it easy
for them to find and explore your content. One of those users is a search engine, which helps
people discover your content. SEO---short for search engine optimization---is about
helping search engines understand your content, and helping users find your site and make a
decision about whether they should visit your site through a search engine.


The [Search Essentials](https://developers.google.com/search/docs/essentials) outline the most important elements of
what makes your website eligible to appear on Google Search. While there's no guarantee that any
particular site will be added to Google's index, sites that follow the **Search Essentials are
more likely to show up in Google's search results** . SEO is about taking the next step and
**working on improving your site's presence in Search**. This guide will walk you through some
of the most common and effective improvements you can do on your site.


There are no secrets here that'll automatically rank your site first in Google (sorry!). In fact
some of the suggestions might not even apply to your business, but following the best practices
will hopefully make it easier for search engines (not just Google) to crawl, index, and understand
your content.

## How does Google Search work?


Google is a fully automated search engine that uses programs called crawlers to explore the web
constantly, looking for pages to add to our index. You usually don't need to do anything except
publish your site on the web. In fact, the vast majority of sites listed in our results are found
and added automatically as we crawl the web. If you're hungry for more, we have documentation
about how [Google discovers, crawls, and serves web pages](https://developers.google.com/search/docs/fundamentals/how-search-works).

> [!IMPORTANT]
> **Short on time or not feeling adventurous?** You might consider hiring a professional. [Here's what to consider](https://developers.google.com/search/docs/fundamentals/do-i-need-seo).

## How long until I see impact in search results?


Every change you make will take some time to be reflected on Google's end. Some changes might take
effect in a few hours, others could take several months. In general, you likely want to wait a few
weeks to assess whether your work had beneficial effects in Google Search results. Keep in mind
that not all changes you make to your website will result in noticeable impact in search results;
if you're not satisfied with your results and your business strategies allow it, try
iterating with the changes and see if they make a difference.

## Help Google find your content


Before you actually do anything mentioned in this section, check if Google has already found your
content (maybe you don't need to do anything!). Try searching on Google for your site with the
`https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site`.
If you see results pointing to your site, you're in the index. For example, a search for `site:wikipedia.org` returns
[these results](https://www.google.com/search?q=site:wikipedia.org).
If you don't see your site, check out the [technical requirements](https://developers.google.com/search/docs/essentials/technical)
to make sure there's nothing technically preventing your site from showing in Google Search, and
then come back here.


Google primarily finds pages through links from other pages it already crawled. In many cases,
these are other websites that are linking to your pages. Other sites linking to you is something
that happens naturally over time, and you can also encourage people to discover your content by
[promoting your site](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting).


If you're open to a little technical challenge, you could also
[submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)---which is a
file that contains all the URLs on your site that you care about. Some content management systems
(CMS) may even do this automatically for you. However this isn't required, and you should first
focus on making sure [people know about your site](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting).

### Check if Google can see your page the same way a user does


When Google crawls a page, it should ideally [see the page the same way an average user does](https://developers.google.com/search/blog/2014/05/understanding-web-pages-better).
For this, Google needs to be able to access the same resources as the user's browser. If your site
is hiding important components that make up your website (like [CSS](https://en.wikipedia.org/wiki/CSS)
and [JavaScript](https://en.wikipedia.org/wiki/JavaScript)), Google might
not be able to understand your pages, which means they might not show up in search results or rank
well for the terms you're targeting.


If your pages have different information depending on the user's physical location, make sure
you're satisfied with the information that Google sees from its crawler's location, which is generally
the US.


To check how Google sees your page, use the [URL Inspection Tool in Search Console](https://support.google.com/webmasters/answer/9012289).

### Don't want a page in Google's search results?


It might be important for you to opt out your site as a whole or sections of it from appearing in
search results. For example, you might not want your posts about your new embarrassing haircut to
show up in search results. Google supports various ways that lets you opt out of crawling and
indexing of your URLs. If you need to block some files, directories, or even your whole site from
Google Search, check out our guide about
[ways to prevent content from appearing in search results](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share#how-to-block-content).

## Organize your site


When you're setting up or redoing your site, it can be good to organize it in a logical way because it
can help search engines and users understand how your pages relate to the rest of your site. Don't
drop everything and start reorganizing your site right now though: while these suggestions can be
helpful long term (especially if you're working on a larger website), search engines will likely
understand your pages as they are right now, regardless of how your site is organized.

### Use descriptive URLs


Parts of the URL can be displayed in search results as breadcrumbs, so users can also use the URLs
to understand whether a result will be useful for them.
An illustration that shows a text result in Google Search with callouts that label specific visible URL visual elements, including the domain and breadcrumb [Domain](https://developers.google.com/search/docs/appearance/visual-elements-gallery#domain)
[Breadcrumb](https://developers.google.com/search/docs/appearance/visual-elements-gallery#breadcrumb)


Google learns breadcrumbs automatically based on the words in the URL, but you can also influence
them with [structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) if you
like a technical challenge. Try to include words in the URL that may be useful for users; for
example:

`https://www.example.com/pets/cats.html`

A URL that only contains random identifiers is less helpful for users; for example:

`https://www.example.com/2/6772756D707920636174`

### Group topically similar pages in directories

![An illustration of how to group pages in directories](https://developers.google.com/static/search/docs/images/grouping-pages-in-directories.png)


If you have more than a few thousand URLs on your site, how you organize your content may have
effects on how Google crawls and indexes your site. Specifically, using directories (or folders)
to group similar topics can help Google learn how often the URLs in individual directories
change.


For example, consider the following URLs:


`https://www.example.com/policies/return-policy.html`


`https://www.example.com/promotions/new-promos.html`


The content in the `policies` directory seldomly changes, however the content in the
`promotions` directory likely changes very often. Google can learn this information
and crawl the different directories at different frequencies. To learn more about search-friendly
site structures, check out our [guide for ecommerce sites](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure),
for which a good URL structure is more important as they tend to be larger.

### Reduce duplicate content


Some websites show the same content under different URLs, which is called *[duplicate content](https://developers.google.com/search/docs/crawling-indexing/canonicalization)*.
Search engines choose a single URL (the *canonical* URL) to show users, per piece of content.


Having duplicate content on your site is not a violation of our spam policies, but it can be a bad
user experience and search engines might waste crawling resources on URLs that you don't even care
about. If you're feeling adventurous, it's worth figuring out if you can
[specify a canonical version](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
for your pages. But if you don't canonicalize your URLs yourself, Google will try to automatically
do it for you.


When working on canonicalization, try to ensure that each piece of content on your site is only
accessible through one individual URL; having two pages that contain the same
information about your promotions can be a confusing user experience (for example, people
might wonder which is the right page, and whether there's a difference between the two).


If you have multiple pages that have the same information, try setting up a
[redirect](https://developers.google.com/search/docs/crawling-indexing/301-redirects) from non-preferred URLs to a
URL that best represents that information. If you can't redirect, use the
`https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`
`link` element instead. But again, don't worry too much about this;
search engines can generally figure this out for you on their own most of the time.

## Make your site interesting and useful


Creating content that people find compelling and useful will likely influence your website's presence in search
results more than any of the other suggestions in this guide. While "compelling and useful content" can
mean different things to different people, content like this generally shares some common attributes,
such as:

- **The text is easy-to-read and well organized**: Write content naturally and make sure the content is well written, easy to follow, and free of spelling and grammatical mistakes. Break up long content into paragraphs and sections, and provide headings to help users navigate your pages.
- **[The content is unique](https://developers.google.com/search/docs/essentials/spam-policies#scraped-content)**: When you're writing new content, don't copy others' content in part or in its entirety: create the content yourself based on what you know about the topic. Don't just rehash what others already published.
- **The content is up-to-date**: Check in on previously published content and update it as needed, or even delete it if it's not relevant anymore.
- **The content is [helpful, reliable, and people-first](https://developers.google.com/search/docs/fundamentals/creating-helpful-content):** Be sure that you're writing content that your readers will find helpful and reliable. For example, providing expert or experienced sources can help people understand your articles' expertise.

### Expect your readers' search terms


Think about the words that a user might search for to find a piece of your content. Users who know
a lot about the topic might use different keywords in their search queries than someone who is new
to the topic. For example, some users might search for "charcuterie", while others might search
for "cheese board". Anticipating these differences in search behavior and writing with your
readers in mind could produce positive effects on how your site performs in search results.

However, don't worry if you don't anticipate every variation of how someone might seek your
content. Google's language matching systems are sophisticated and can understand how your page
relates to many queries, even if you don't explicitly use the exact terms in them.

### Avoid distracting advertisements


While ads are a part of the internet and are meant to be seen by users, don't let them become
overly distracting or prevent your users from reading your content. For example, advertisements,
or [interstitial pages](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) (pages
displayed before or after the content you're expecting) that make it difficult to use the website.

### Link to relevant resources


Links are a great way to connect your users and search engines to other parts of your site, or
relevant pages on other sites. In fact, the vast majority of the new pages Google finds every day
are through links, making links a crucial resource you need to consider to help your pages be
discovered by Google and potentially shown in search results. Additionally, links can also add
value by connecting users (and Google) to another resource that corroborates what you're writing
about.
![An illustration that shows how one web page is linking to other relevant resources](https://developers.google.com/static/search/docs/images/link-to-relevant-resources.png)

#### Write good link text


*Link text* (also known as *anchor text*) is the text part of a link that you can see.
This text tells users and Google something about the page you're linking to. With
[appropriate anchor text](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#write-good-anchor-text),
users and search engines can easily understand what your linked pages contain before they visit.
![An illustration that shows text part of a link](https://developers.google.com/static/search/docs/images/what-is-link-text.png)

#### Link when you need to


Links can provide more context on a topic, both for users and search engines, which may help
demonstrate your knowledge on a topic. However when you're linking to pages outside of your
control, for example content on other sites, make sure you trust the resource you're linking to.
If you can't trust the content and you still want to link to them, add a
[`nofollow` or similar annotation](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
to the link to avoid search engines associating your site with the site you're linking to. This
helps avoid potential negative consequences in your rankings in Google Search.


If you're accepting user-generated content on your site, such as forum posts or comments, make
sure every link that's posted by users has a `nofollow` or similar annotation
automatically added by your CMS. Since you're not creating the content in this case, you likely
don't want your site to be blindly associated with the sites users are linking to. This can also
help discourage spammers from abusing your website.

## Influence how your site looks in Google Search

[Video](https://www.youtube.com/watch?v=IosyvXjQvlw)


A typical Google Search results page consists of a
[few different visual elements](https://developers.google.com/search/docs/appearance/visual-elements-gallery) that
you can influence to help users decide whether they should visit your site through those search
results. In this section, we're focusing on the *title link* and the *snippet* because
these are the more visually significant elements.

### Influence your title links


The *title link* is the headline part of the search result and it can help people decide
which search result to click. There are a few sources that Google uses to generate this title
link, including the words inside the `<title>` element (also called the title
text) and other headings on the page. This title text can also be used for the title that's shown
in browsers and bookmarks.
An illustration of a text result in Google Search, with a highlighted box around the title link part [How to make your own chili oil](https://wikipedia.org/wiki/Chili_oil)

> [!NOTE]
> **If you use a CMS** , you might not need to do anything technical to your titles, beyond just focusing on writing good titles. Most CMSes can automatically turn the titles you write into a `<title>` element in the HTML.

![An illustration of how title text looks on a web page, and then how it looks in the HTML](https://developers.google.com/static/search/docs/images/titles-on-page-html.png)


You can influence the title links in Search by writing good titles: a good title is unique to the
page, clear and concise, and accurately describes the contents of the page. For example, your
title could include the name of your website or business, other bits of important information like
the physical location of the business, and maybe some information about what the particular page
has to offer for users. Our [documentation about title links](https://developers.google.com/search/docs/appearance/title-link)
has more tips about how to create good titles and how to influence your site's search results'
title links.

### Control your snippets


Below the title link, a search result typically has a description of the target page to help users
decide whether they should click the search result. This is called a *snippet*.
An illustration of a text result in Google Search, with a highlighted box around the snippet part Learn how to cook eggs with this complete guide in less
than 5 minutes. We cover all the methods, including sunny side up, boiled, and poached.


The snippet is sourced from the actual content of the page the search result is linking to, thus
you have complete control over the words that can be used to generate the snippet. Occasionally
the snippet may be sourced from the contents of the meta description tag, which is typically a
succinct, one- or two-sentence summary of the page. A good meta description is short, unique to one
particular page, and includes the most relevant points of the page. Check out our tips for
[writing good meta descriptions](https://developers.google.com/search/docs/appearance/snippet#meta-descriptions) for
more inspiration.

## Add images to your site, and optimize them


Many people search visually, and images can be how people find your website for the first time.
For example, if you have a recipe blog, people might find your content by searching for "fruit
tart recipes" and browsing photos of various types of fruit tarts.


As you add images to your site, make sure that people and search engines can find and understand them.

### Add high-quality images near relevant text


When you use high quality images, you give users enough context and detail to decide which image
best matches what they were looking for. For example, if people are looking for "daisies" and
come across a rogue edelweiss in search results, a higher quality image would help them distinguish
the type of flower.


Use images that are sharp and clear, and place them near text that's relevant to the image. The
text that's near images can help Google better understand what the image is about and what it
means in context to your page.


For example, if the page is reviewing yarn shops in London, then it would make sense to embed one
of your photos of the yarn shop in the section that details the location, description, and review
information for that yarn shop. This helps Google and users associate the image with text that
provides more context to what the page is about.

### Add descriptive alt text to the image


Alt text is a short, but descriptive piece of text that explains the relationship between the
image and your content. It helps search engines understand what your image is about and the
context of how your image relates to your page, so writing [good alt text](https://developers.google.com/search/docs/appearance/google-images#descriptive-alt-text)
is quite important. You can add this to your HTML with the `alt` attribute of the
`img` element, or your CMS may have an easy way to specify a description for an image
when you're uploading it to your site. Learn more about [how to write good alt text](https://developers.google.com/search/docs/appearance/google-images#descriptive-alt-text),
and how to add it to your images.

## Optimize your videos


If your website includes pages that are primarily about individual videos, people may also be able
to discover your site through video results in Google Search. Many of the best practices for
images and text also apply to videos:

- Create high-quality video content, and embed the video on a standalone page, near text that's relevant to that video.
- Write descriptive text in the titles and description fields of a video (the title of a video is still a title, and so you can apply the best practices for writing titles here too).


If your site is particularly video-focused, then continue reading about more things you can do to
[optimize your videos for search engines](https://developers.google.com/search/docs/appearance/video).

## Promote your website


Effectively promoting your new content will lead to faster discovery by those who are interested
in the same subject, and also by search engines. You can do this in many ways:

- Social media promotion
- Community engagement
- Advertisement, both offline and online
- Word of mouth, and many other methods


One of the [most effective and lasting ways](https://www.nielsen.com/insights/2012/global-trust-in-advertising-and-brand-messages-2/)
is word of mouth: that is, people familiar with your site tell their friends about it, who in turn
visit your site. This can take time, and usually you need to invest some time and effort in other
practices first, such as community engagement. Our friends over at Google for Creators have excellent
resources about [building and engaging your audience](https://creators.google/en-us/content-creation-guides/audience-engagement/).


Putting effort into the offline promotion of your company or site can also be rewarding. For
example, if you have a business site, make sure its URL is listed on your business cards,
letterhead, posters, and other materials. With their permission, you could also send out recurring
newsletters to your audience letting them know about new content on your website.


As with everything in life, you can overdo promoting your site and actually harm it: people may get
fatigued of your promotions, and search engines may perceive some of the practices as
[manipulation of search results](https://developers.google.com/search/docs/essentials/spam-policies).

## Things we believe you shouldn't focus on


As SEO has evolved, so have the ideas and practices (and at times, misconceptions) related to it.
What was considered best practice or top priority in the past may no longer be relevant or
effective due to the way search engines (and the internet) have developed over time.


To help you focus on the things that are actually important when it comes to SEO, we collected
some of the most common and prominent topics we've seen circulating the internet. In general, our
message on these topics is that you should do what's best for your business area; we will
elaborate on a few specific points here:

|---|---|---|
|   | Meta keywords : Google Search [doesn't use the keywords meta tag](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag). Keyword stuffing : Excessively repeating the same words over and over (even in variations) is tiring for users, and [keyword stuffing is against Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies#keyword-stuffing). Keywords in the domain name or URL path :   When picking the name of your site, do what's best for your business. Users will use this name to find you, so we recommend following general marketing best practices. From a ranking perspective, the keywords in the name of the domain (or URL path) alone have hardly any effect beyond appearing in [breadcrumbs](https://developers.google.com/search/docs/appearance/visual-elements-gallery#breadcrumb). And while still on the topic of domain names: the TLD (the domain name ending like ".com" or ".guru") only matters if you're targeting a specific country's users, and even then it's usually a low impact signal. For example, if you're trying to sell Dutch cheese to people searching from Switzerland, it makes some sense (both from business and [SEO point of view](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites#geotargeting)) to use a .ch domain name. Otherwise Google Search doesn't care which TLD you're using (whether it's a .com or .org or .asia). Minimum or maximum content length : The length of the content alone doesn't matter for ranking purposes (there's no magical word count target, minimum or maximum, though you probably want to have at least one word). If you are varying the words (writing naturally to not be repetitive), you have more chances to show up in Search simply because you are using more keywords. | Subdomains versus subdirectories : From a business point of view, do whatever makes sense for your business. For example, it might be easier to manage the site if it's segmented by subdirectories, but other times it might make sense to partition topics into subdomains, depending on your site's topic or industry. PageRank : While [PageRank](https://developers.google.com/search/docs/appearance/ranking-systems-guide#link-analysis) uses links and is one of the fundamental algorithms at Google, there's much more to Google Search than just links. We have many ranking signals, and PageRank is just one of those. Duplicate content "penalty" : If you have some content that's accessible under multiple URLs, it's fine; don't fret about it. It's inefficient, but it's not something that will cause a manual action. [Copying others' content, however, is a different story.](https://developers.google.com/search/docs/essentials/spam-policies#scraped-content) Number and order of headings : Having your headings in semantic order is fantastic for screen readers, but from Google Search perspective, it doesn't matter if you're using them out of order. The web in general is not valid HTML, so Google Search can rarely depend on semantic meanings hidden in the HTML specification. There's also no magical, ideal amount of headings a given page should have. However, if you think it's too much, then it probably is. Thinking E-E-A-T is a ranking factor : [No, it's not.](https://developers.google.com/search/docs/fundamentals/creating-helpful-content#eat) |

## Next steps

- **Get started with Search Console** : Setting up a Search Console account helps you monitor and optimize how your website performs on Google Search. Learn how to [set up your account and what reports to check out first](https://developers.google.com/search/docs/monitor-debug/search-console-start).
- **Maintain your website's SEO over time** : Learn more about [managing your site's presence in the long term](https://developers.google.com/search/docs/fundamentals/get-started), including more in-depth SEO tasks and scenarios, such as preparing for a site move, or managing a multi-lingual site.
- **Enhance how your site looks in Google Search results** : Valid [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) on your pages also makes your pages eligible for many special features in Google Search results, including review stars, carousels, and more. Explore the [gallery of search result types](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) that your page can be eligible for.

### Stay informed and ask questions


As you embark on your SEO journey, here are some resources that can help you stay on top of
changes and new resources we publish:

|---|---|---|
|   | - [Google Search Central blog](https://developers.google.com/search/blog): Get the latest information from our Google Search Central blog. You can find information about updates to Google Search, new Search Console features, and much more. - Google Search Central on [LinkedIn](https://www.linkedin.com/showcase/googlesearchcentral/) and [X (Twitter)](https://twitter.com/googlesearchc): Follow us for updates on Google Search and resources to help you make a great site. | - [Google Search Central Help Forum](https://support.google.com/webmasters/community): Post questions about your site's SEO issues and find tips to create high quality sites from the product forum for website owners. There are many experienced contributors in the forum, including [Product Experts](https://productexperts.withgoogle.com/) and occasionally Googlers. - [Google Search Central YouTube Channel](https://www.youtube.com/c/GoogleSearchCentral): Watch hundreds of helpful videos created for website owners. |











# In-Depth Guide to How Google Search Works | Google Search Central

# In-depth guide to how Google Search works


Google Search is a fully-automated search engine that uses software known as web crawlers that
explore the web regularly to find pages to add to our index. In fact, the vast majority of
pages listed in our results aren't manually submitted for inclusion, but are found and added
automatically when our web crawlers explore the web. This document explains the stages of how
Search works in the context of your website. Having this base knowledge can help you fix
crawling issues, get your pages indexed, and learn how to optimize how your site appears in
Google Search.

> [!NOTE]
> Looking for something less technical? Check out our [How Search Works site](https://www.google.com/search/howsearchworks/), which explains how Search works from a searcher's perspective.

## A few notes before we get started


Before we get into the details of how Search works, it's important to note that Google doesn't
accept payment to crawl a site more frequently, or rank it higher. If anyone tells you
otherwise, they're wrong.


Google doesn't guarantee that it will crawl, index, or serve your page, even if your page
follows the [Google Search Essentials](https://developers.google.com/search/docs/essentials).

## Introducing the three stages of Google Search

Google Search works in three stages, and not all pages make it through each stage:

1. [**Crawling:**](https://developers.google.com/search/docs/fundamentals/how-search-works#crawling) Google downloads text, images, and videos from pages it found on the internet with automated programs called crawlers.
2. [**Indexing:**](https://developers.google.com/search/docs/fundamentals/how-search-works#indexing) Google analyzes the text, images, and video files on the page, and stores the information in the Google index, which is a large database.
3. [**Serving search results:**](https://developers.google.com/search/docs/fundamentals/how-search-works#serving) When a user searches on Google, Google returns information that's relevant to the user's query.

## Crawling


The first stage is finding out what pages exist on the web. There isn't a central registry of
all web pages, so Google must constantly look for new and updated pages and add them to its
list of known pages. This process is called "URL discovery". Some pages are known because
Google has already visited them. Other pages are discovered when Google extracts a link from a
known page to a new page: for example, a hub page, such as a category page, links to a new
blog post. Still other pages are discovered when you submit a list of pages (a
[sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)) for Google to crawl.
[Video](https://www.youtube.com/watch?v=JuK7NnfyEuc)


Once Google discovers a page's URL, it may visit (or "crawl") the page to find out what's on
it. We use a huge set of computers to crawl billions of pages on the web. The program that
does the fetching is called [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot)
(also known as a crawler, robot, bot, or spider). Googlebot uses an algorithmic process to
determine which sites to crawl, how often, and how many pages to fetch from each site.
[Google's crawlers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
are also programmed such that they try not to crawl the site too fast to avoid overloading it.
This mechanism is based on the responses of the site (for example,
[HTTP 500 errors mean "slow down"](https://developers.google.com/search/docs/crawling-indexing/http-network-errors#http-status-codes)).


However, Googlebot doesn't crawl all the pages it discovered. Some pages may be
[disallowed for crawling](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#disallow) by the
site owner, other pages may not be accessible without logging in to the site.


During the crawl, Google renders the page and
[runs any JavaScript it finds](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#how-googlebot-processes-javascript)
using a recent version of
[Chrome](https://www.google.com/chrome/), similar to how your
browser renders pages you visit. Rendering is important because websites often rely on
JavaScript to bring content to the page, and without rendering Google might not see that
content.


Crawling depends on whether Google's crawlers can access the site. Some common issues with
Googlebot accessing sites include:

- [Problems with the server handling the site](https://developers.google.com/search/docs/crawling-indexing/http-network-errors#http-status-codes)
- [Network issues](https://developers.google.com/crawling/docs/troubleshooting/dns-network-errors)
- [robots.txt rules preventing Googlebot's access to the page](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

## Indexing


After a page is crawled, Google tries to understand what the page is about. This stage is
called indexing and it includes processing and analyzing the textual content and key content
tags and attributes, such as
[`<title>` elements](https://developers.google.com/search/docs/appearance/title-link)
and alt attributes,
[images](https://developers.google.com/search/docs/appearance/google-images),
[videos](https://developers.google.com/search/docs/appearance/video), and
more.
[Video](https://www.youtube.com/watch?v=pe-NSvBTg2o)


During the indexing process, Google determines if a page is a
[duplicate of another page on the internet or canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
The canonical is the page that may be shown in search results. To select the canonical, we
first group together (also known as clustering) the pages that we found on the internet that
have similar content, and then we select the one that's most representative of the group. The
other pages in the group are alternate versions that may be served in different contexts, like
if the user is searching from a mobile device or they're looking for a very specific page from
that cluster.


Google also collects signals about the canonical page and its contents, which may be used in
the next stage, where we serve the page in search results. Some signals include the language
of the page, the country the content is local to, and the usability of the page.


The collected information about the canonical page and its cluster may be stored in the Google
index, a large database hosted on thousands of computers. Indexing isn't guaranteed; not every
page that Google processes will be indexed.


Indexing also depends on the content of the page and its metadata. Some common indexing issues
can include:

- [The quality of the content on page is low](https://developers.google.com/search/docs/essentials)
- [Robots `meta` rules disallow indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [The design of the website might make indexing difficult](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

## Serving search results

> [!NOTE]
> Google doesn't accept payment to rank pages higher, and ranking is done programmatically. [Learn more about ads on Google Search](https://www.google.com/search/howsearchworks/our-approach/ads-on-search/).


When a user enters a query, our machines search the index for matching pages and return the
results we believe are the highest quality and most relevant to the user's query. Relevancy is
determined by hundreds of factors, which could include information such as the user's
location, language, and device (desktop or phone). For example, searching for "bicycle repair
shops" would show different results to a user in Paris than it would to a user in Hong Kong.
[Video](https://www.youtube.com/watch?v=lgQazesEjO4)


Based on the user's query the search features that appear on the search results page also
change. For example, searching for "bicycle repair shops" will likely show local results and
no [image results](https://developers.google.com/search/docs/appearance/visual-elements-gallery#image-result),
however searching for "modern bicycle" is more likely to show image results, but not local
results. You can explore the most common UI elements of Google web search in our
[Visual Element gallery](https://developers.google.com/search/docs/appearance/visual-elements-gallery).


Search Console might tell you that a page is indexed, but you don't see it in search results.
This might be because:

- [The content on the page is irrelevant to users' queries](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#expect-search-terms)
- [The quality of the content is low](https://developers.google.com/search/docs/essentials)
- [Robots `meta` rules prevent serving](https://developers.google.com/search/docs/crawling-indexing/block-indexing)


While this guide explains how Search works, we are always working on improving our algorithms.
You can keep track of these changes by following the
[Google Search Central blog](https://developers.google.com/search/blog).






# Optimizing your website for generative AI features on Google Search


User preferences are rapidly evolving and people are increasingly gravitating to generative AI
experiences to help them find information. As we upgrade Search to meet these changing expectations,
this transformation offers new opportunities to reach people who may be more inclined to engage
with your site, spend more time with your content, or even convert by becoming a subscriber or
making a purchase. This guide is for website owners looking for official best practices from Google
Search on how to succeed in generative AI features in Google Search (such as AI Overviews and AI
Mode).

## Is SEO still relevant for generative AI search?


In short, yes! The [best practices for SEO](https://developers.google.com/search/docs/essentials) continue to be
relevant because our generative AI features on Google Search are rooted in our core Search ranking
and quality systems. These features rely on AI techniques to highlight content from our Search
index, such as:

- **Retrieval-augmented generation (RAG)**: A technique (also known as grounding) used to improve the quality, accuracy, and freshness of AI responses by relying on our core Search ranking systems to retrieve relevant, up-to-date web pages from our Search index. Our systems then review the specific information from those retrieved pages to generate a more reliable and helpful response, showing prominent, clickable links to relevant web pages that support the information in the response.
- **Query fan-out**: A set of concurrent, related queries generated by the model to request more information and fetch additional relevant search results to address the user's query. For example, if the original user's query is "how to fix a lawn that's full of weeds", fanout queries might include "best herbicides for lawns", "remove weeds without chemicals", and "how to prevent weeds in lawn".

> [!IMPORTANT]
> **What about "AEO" and "GEO"?** "AEO" stands for "answer engine optimization" and "GEO" for "generative engine optimization". These are both terms you may see used to describe work specifically focused on improving visibility in AI search experiences. From Google Search's perspective, optimizing for generative AI search is optimizing for the search experience, and thus still SEO.

## Apply foundational SEO best practices to generative AI search


This section focuses on reframing SEO best practices to understand what matters most to AI systems
today and how you can implement them in the context of generative AI search, and ultimately with
the goal of improving your website's visibility in both generative AI search experiences and Google
Search overall.

### Create valuable, non-commodity content for your audience


Creating content that people find unique, compelling, and useful will likely influence your
website's presence in generative AI search in the long run more than any of the other suggestions
in this guide. While "unique, valuable, good content" can mean different things to different
people, content like this generally shares some common attributes, such as:

- **Providing a unique point of view**: Our AI systems take a look at a variety of sources, so it can be helpful to have a unique viewpoint that stands out. For example, a first-hand review provides a unique perspective based on personal experience, whereas a summary of existing content simply restates information already available elsewhere. Create the content yourself based on what you know about the topic, and consider what in-depth experience you can bring to your content. Don't just recycle what others on the internet have already said, or could easily be produced by a generative AI model.
- **Creating non-commodity content that's
  [helpful, reliable, and people-first](https://developers.google.com/search/docs/fundamentals/creating-helpful-content):** Be sure that you're writing non-commodity content that your readers will find helpful and reliable. Commodity content (for example, something like "7 Tips for First-Time Homebuyers") is often based on common knowledge, which could originate from anyone, and typically adds little unique insight for readers. In contrast, non-commodity content (such as "Why We Waived the Inspection \& Saved Money: A Look Inside the Sewer Line") provides unique expert or experienced takes that go beyond common knowledge and the ordinary.
- **Organizing content in a way that helps your readers**: Write content for your human audience and make sure the content is well written and easy to follow. People generally appreciate it when web pages are organized by paragraphs and sections, along with headings that provide a clear structure to navigate content.
- **Add high-quality images and video** : Many people appreciate finding images and videos as they search for things online. As with Google Search overall, our generative AI search features can bring in relevant images and video, which means more opportunities for your website to appear beyond web page links. When it makes sense, look for ways to support your textual content with high-quality, relevant images and videos on your pages. If you're already following our [image SEO best practices](https://developers.google.com/search/docs/appearance/google-images) and [video SEO documentation](https://developers.google.com/search/docs/appearance/video), you're already optimizing for generative AI search.
- **Focus on what your users want, and avoid overdoing it.** While it might be tempting to create separate content for every possible variation of how people might search (for example, by focusing on other queries that people have asked, or fan-out queries), doing so primarily to manipulate rankings or generative AI responses in Google Search violates Google's [scaled content abuse spam policy](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content). This is also an ineffective long-term strategy, as a high quantity of pages doesn't make a website higher quality or more relevant to users. Google's AI systems have advanced even further and improved upon our ability to [understand the relevance of pages](https://blog.google/products-and-platforms/products/search/search-language-understanding-bert/), even when there is no exact match between the query and the page's primary content.
- **If you're using generative AI tools to assist in content creation** , be sure that your work meets the standards of the [Search Essentials](https://developers.google.com/search/docs/essentials) and our [spam policies](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content). For more details on our approach, see our [guidance on AI-generated content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).


You can simplify your approach by focusing on one core principle: focus on what your visitors
would enjoy, find helpful, and feel satisfied with after visiting your website. If you're ever
unsure about a decision for your site, ask yourself: "Is this content that my visitors would find
satisfying?" If the answer is yes, then you're on the right track, as our systems are designed to
connect people with exactly that kind of useful information. For more, check out our guide to
[creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Build and maintain a clear technical structure


The way Google Search finds and processes your pages remains the core of how our AI systems access
your data. Technical clarity ensures your content is ready for discovery and indexing, and all
existing technical [SEO best practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
continue to be worthwhile, for example:

- **Meet the Search technical requirements:** To be eligible to be shown in generative AI features on Google Search, a page must be indexed and eligible to be shown in Google Search with a snippet, fulfilling the [Search technical requirements](https://developers.google.com/search/docs/essentials/technical).

  > [!NOTE]
  > Just because a page meets all requirements, best practices, and complies with the policies, doesn't mean that Google will crawl, index, or serve its content. Indexing and serving aren't guaranteed. Learn more about [How Search Works](https://developers.google.com/search/docs/fundamentals/how-search-works).

- **Follow crawling best practices** . To maximize your site's visibility in generative AI search features, ensure your content is crawlable, as Google Search generative AI models use publicly accessible, crawlable content to learn patterns and provide relevant, grounded responses. For very large and frequently updated sites, review our guide to [optimizing your crawl budget](https://developers.google.com/crawling/docs/crawl-budget).
- **When it comes to semantic HTML, focus on human readability and don't worry about
  perfect code:** While it's not required to have perfectly semantic HTML (the web in general is not valid HTML, and Google can understand it), it's generally a good idea to try to use semantic HTML when possible, as it helps other types of users, such as screen readers, [parse and navigate your web page more easily](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#agentic-experiences).
- **If you're using JavaScript, be sure to follow JavaScript SEO best practices** . Google is able to process content within JavaScript as long as it isn't blocked. That said, working on SEO with a website that uses JavaScript frameworks is generally more complex than when working with other kinds of websites. Make sure to follow the usual [SEO best practices for JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- **Provide a [good page experience](https://developers.google.com/search/docs/appearance/page-experience)** for those who arrive at your site. This includes ensuring your site displays well across all devices, reducing latency, and making it easy for people to distinguish your main content from other elements on the page.
- **Reduce duplicate content:** Having duplicate content can be a bad user experience and search engines might waste crawling resources on URLs that you don't even care about. If you have time, [try to reduce it](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#reduce-duplicate-content).


To discover and diagnose potential technical issues quickly, [verify your site in Search Console](https://support.google.com/webmasters/answer/9008080).
For more, check out our [technical guide to SEO](https://developers.google.com/search/docs/fundamentals/get-started-developers)
and [maintaining your website's SEO](https://developers.google.com/search/docs/fundamentals/get-started).

### Optimize your local business and ecommerce details


Where appropriate, generative AI responses can include product listings, product information, and
information about local businesses. Using products like [Merchant Center](https://merchants.google.com/)
(such as [Merchant Center feeds](https://support.google.com/merchants/answer/11586438))
and [Google Business Profiles](https://business.google.com/) can
help your products and services to be visible in both AI responses and other Google Search
results. Learn more about how to
[add and manage your business details on Google Search](https://developers.google.com/search/docs/appearance/establish-business-details).

> [!NOTE]
> Depending on your business type and goals, consider other merchant experiences like [Business Agent](https://support.google.com/brandprofile/answer/16410382), which is a conversational experience on Google Search that helps customers chat with your brand.

## Mythbusting generative AI search: what you don't need to do


As generative AI search evolves, so have the theories and practices---and sometimes, the
misconceptions---surrounding it. While terms like Answer Engine Optimization (AEO) or
Generative Engine Optimization (GEO) are common online, many suggested "hacks" aren't effective or
supported by how Google Search actually works.


To help you focus on what matters for your website's visibility, we've collected some of the most
prominent topics circulating the internet around generative AI and Google Search. Here are a few
things you can ignore for Google Search:

- **LLMS.txt files and other "special" markup** : You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in generative AI search. Note that Google may discover, crawl, and index [many kinds of files](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types) in addition to HTML on a website: this doesn't mean that the file is treated in a special way.
- **"Chunking" content:** There's no requirement to break your content into tiny pieces for AI to better understand it. Google systems are able to understand the nuance of multiple topics on a page and show the relevant piece to users. However, sometimes shorter (or longer!) pages can work well depending on your audience and subject matter. There's no ideal page length, and in the end, make pages for your audience, not just for generative AI search.
- **Rewriting content just for AI systems:** You don't need to write in a specific way just for generative AI search. AI systems can understand synonyms and general meanings of what someone is seeking, in order to connect them with content that might not use the same precise words. This means you don't have to worry that you don't have enough "long-tail" keywords or haven't captured every variation of how someone might seek content like yours.
- **Seeking inauthentic "mentions":** Just like the rest of Google Search, our generative AI features can show what's being said about products and services across the web, including in blogs, videos, and forum discussions. However, seeking inauthentic "mentions" across the web isn't as helpful as it might seem. Our core ranking systems focus on [high-quality content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)while other systems [block spam](https://developers.google.com/search/docs/essentials/spam-policies); our generative AI features depend on both.
- **Overfocusing on structured data**: Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add. However, it's a good idea to continue using it as part of your overall SEO strategy, as it helps with being eligible for rich results on Google Search.

## Explore agentic experiences


AI agents are autonomous systems that can perform tasks on behalf of people, such as booking a
reservation or comparing product specifications. These agents can take many forms; for example,
browser agents may access your website to gather the data they need to complete these tasks, such
as analyzing visual renderings (like screenshots), inspecting the DOM structure, and interpreting
the accessibility tree.


If this is something that's relevant to your business and you have extra time, check out the
available agentic experiences and review the guide to
[agent-friendly website best practices](https://web.dev/articles/ai-agent-site-ux),
which gives some insights into how a website can generally prepare for current browser agents.
Protocols like [Universal Commerce Protocol](https://ucp.dev/latest/)
(UCP) are emerging that will allow Search agents to do more.

## Next steps: what to focus on


As you continue working on your website, remember that plenty of content thrives in Google Search
(including generative AI experiences) without any overt SEO at all, and you don't need to
accomplish everything in this guide in order to succeed on Google Search. To recap, here are the
key takeaways from this guide:

- **Apply SEO best practices to generative AI search:** Continue prioritizing foundational SEO best practices, such as [building a clear technical structure](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#build-technical-structure) and [creating unique, valuable content](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#create-valuable-content); these are the foundation for visibility in generative AI search experiences (and Google Search overall).
- **Create non-commodity content that's [helpful, reliable, and people-first](https://developers.google.com/search/docs/fundamentals/creating-helpful-content):** Focus on developing unique, expert-led content that provides value beyond common knowledge.
- **Prioritize effective SEO strategies over "AEO/GEO hacks":** For Google Search, you can ignore tactics like "chunking" content, creating unnecessary AI text files (like llms.txt), or pursuing inauthentic mentions.
- **Explore agentic experiences**: Stay informed about emerging technologies that allow AI agents to interact with your site, such as browser agents and new protocols.

## Stay informed and ask questions


If you want to learn more about SEO, here are some resources that can help you stay on top of
changes and new resources we publish:

|---|---|---|
|   | - [Google Search Central blog](https://developers.google.com/search/blog): Get the latest information from our Google Search Central blog. You can find information about generative AI in Search, new Search Console features, and much more. - Google Search Central on [LinkedIn](https://www.linkedin.com/showcase/googlesearchcentral/) and [X (Twitter)](https://twitter.com/googlesearchc): Follow us for updates on Google Search and resources to help you make a great site. | - [Google Search Central Help Forum](https://support.google.com/webmasters/community): Post questions about your site's SEO issues and find tips to create high quality sites from the product forum for website owners. There are many experienced contributors in the forum, including [Product Experts](https://productexperts.withgoogle.com/) and occasionally Googlers. - [Google Search Central YouTube Channel](https://www.youtube.com/c/GoogleSearchCentral): Watch hundreds of helpful videos created for website owners. |





# Technical SEO Techniques and Strategies | Google Search Central

# Maintaining your website's SEO

If your site is on Google and you're familiar with the [fundamentals of SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), there are more
things you can do to improve how your site appears on Google. As you manage and maintain your
website, you may come across more unique scenarios that affect Google Search. This guide covers
more in-depth SEO tasks, such as preparing for a site move or managing a multi-lingual site.

## Control how Google crawls and indexes your site

Read our guide to understand [how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works);
if you don't understand the crawl/index/serving pipeline well, it
will be difficult to debug issues or anticipate Search behavior on your site.

### Duplicate content


Be sure that you understand what
[canonical pages are](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#definition),
and how they affect crawling and indexing of your site.

### Resources

Be sure that any resources (images, CSS files, and so on) or pages that Google is meant to
crawl are accessible to Google; that is, they are not blocked by any robots.txt rules and are
accessible to an anonymous user. Inaccessible pages will not appear in the
[Page Indexing report](https://search.google.com/search-console/index),
and the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
will show them as not crawled. Blocked resources are shown only at the
individual URL level, in the URL Inspection tool. If important resources on a page are blocked,
this can prevent Google from crawling your page properly. Use the URL Inspection tool to render
the live page to verify whether Google sees the page as you expect.

### Robots.txt

Use robots.txt rules to prevent crawling, and sitemaps to encourage crawling. Block crawling
of duplicate content on your site, or unimportant resources (such as small, frequently used
graphics such as icons or logos) that might overload your server with requests. Don't use
robots.txt as a mechanism to prevent indexing; use the `noindex` tag or login
requirements for that. [Read more about blocking access to your content.](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share)

### Sitemaps

Sitemaps are a very important way to tell Google which pages are important to your site, and
also provide additional information (such as update frequency), and are very important for
crawling non-textual content (such as images or video). Although Google won't limit crawling
to pages listed in your sitemaps, it will prioritize crawling these pages. This is especially
important for sites with rapidly changing content, or with pages that might not be discovered
through links. Using sitemaps helps Google discover and prioritize which pages to crawl on
your site. [Read all about sitemaps here.](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

### Internationalized or multi-lingual sites

If your site includes multiple languages, or is targeted at users in specific locales:

- [Read about
  multi-regional and multi-lingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) for high-level advice on how to manage sites that have localized content for different languages or regions.
- [Use hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions) to tell Google about different language variations of pages on your site.
- If your site adapts the content of its pages based on the locale of the request, read [how this can affect Google's crawl of your site](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages).

### Migrating a page or a site

On the occasion that you might need to move a single URL or even a whole site, follow these guidelines:

#### Migrating a single URL

If you move a page permanently to another location, don't forget
[to implement `301` redirects for your
page](https://developers.google.com/search/docs/crawling-indexing/301-redirects). If the move is only temporary for some reason, return `302` instead to tell
Google to continue to crawl your page.

When a user requests a page that has been removed, you can create a custom `404` page to
provide a better experience. Just be sure that when a user requests a page that is no longer
there, you return a true `404` error, not a [`soft 404`](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#soft-404-errors).

#### Migrating a site

If you're migrating an entire site, implement all the `301` and sitemap changes you need, then
tell Google about the move so that we can start crawling the new site and forwarding your
signals to the new site.
[Learn how to migrate your site.](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

### Follow crawling and indexing best practices

- **[Make your links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#crawlable-links).**
- **[Use `rel=nofollow`](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
  for paid links**, links that require login, or untrusted content (such as user-submitted content) to avoid passing your quality signals on to them, or having their bad quality reflect on you.
- **[Managing your crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)**: If your site is particularly large (hundreds of millions of pages that change periodically, or perhaps tens of millions of pages that change frequently), Google might not be able to crawl your entire site as often as you'd like, so you might need to point Google to the most important pages on your site. The best mechanism for doing so at present is to list your most recently updated or most important pages in your sitemaps, and hiding your less important pages using robots.txt rules.
- **JavaScript usage** : Follow [Google's recommendations for JavaScript on websites](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- **Multi-page articles**: If you have an article broken into several pages, be sure that there are prominent next and previous links for users to click (and that these are crawlable links). That's all you need for the page set to be crawled by Google.
- **Infinite scroll pages** : Google can have trouble scrolling through infinite scroll pages; provide a paginated version if you want the page to be crawled. [Learn more about search-friendly infinite scroll pages.](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading#paginated-infinite-scroll)
- **Block access to URLs that change state,** such as posting comments, creating accounts, adding items to a cart, and so on. Use [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) to block these URLs.
- Review the [list of which file types are indexable by Google](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types).
- In the unlikely situation that **Google seems to be crawling your site too
  much** , you can [reduce the crawl rate](https://developers.google.com/search/docs/crawling-indexing/reduce-crawl-rate) for your site. However, this should be a rare occurrence.
- If your site is still HTTP, we recommend [migrating to HTTPS](https://web.dev/articles/enable-https), for your [users' security, as well as your own](https://developers.google.com/search/blog/2018/12/why-how-to-secure-your-website-https).

## Help Google understand your site

Put key information in text, not graphics, on the site. Although Google can parse and index
[many file types](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types),
text is still the safest bet to help us understand the content of the page. If
you use non-text content, or if you want to provide additional guidance about the content of
the site, add [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) to your
pages to help us understand your content (and in some cases, provide special search features
such as [rich results](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)).

If you feel comfortable with HTML and basic coding, you can add structured data by hand
following the [developer guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
If you want a little help, you can use the WYSIWYG [Structured Data Markup helper](https://support.google.com/webmasters/answer/3069489)
to help you generate basic structured data for you.

If you don't have the ability to add structured data to your pages, you might use the
[Data Highlighter tool](https://support.google.com/webmasters/answer/2753960),
which lets you highlight portions of a page and tell Google what each section
represents (an event, a date, a price, and so on). This is simple, but it can break if you
change the layout of your page.

[Read more about helping Google understand your site content.](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#understand_your_content)

## Follow our guidelines

> [!CAUTION]
> **Caution** : Be sure to follow our [Search Essentials](https://developers.google.com/search/docs/essentials). Some of these are recommendations and best practices; others can lead to a site being removed from the Google index if you do not follow them.

### Content-specific guidelines

If you have specific types of content on your site, here are some recommendations for getting
them on Google in the best way:

- **Video** : Be sure to follow our [video best practices](https://developers.google.com/search/docs/appearance/video) to enable Google to find, crawl, and show results for videos hosted on your site.
- **Images** : Follow our [image best practices](https://developers.google.com/search/docs/appearance/google-images) to get your images to appear in Search. You can show additional information about your image in Google Images by [providing image metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) on the image host page. To block an image from being indexed, [use a robots.txt `Disallow` rule](https://developers.google.com/search/docs/crawling-indexing/prevent-images-on-your-page).
- **For children:** If your content is specifically for children, [tag your pages or site as child-directed](https://developers.google.com/search/docs/advanced/guidelines/tag-child-directed-treatment) in order to comply with the Children's Online Privacy Protection Act ([COPPA](https://business.ftc.gov/privacy-and-security/childrens-privacy)).
- **Adult sites** : If your site (or specific pages) contain adult-only content, you might consider [tagging it as adult content](https://developers.google.com/search/docs/crawling-indexing/safesearch), which will filter it in SafeSearch results.
- **News:** If you run a news site, here are some important considerations:
  - If you have news content, be sure to read the [Google Publisher Center help documentation](https://support.google.com/news/publisher-center/).
  - In addition, create a [News sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap) to help Google discover content more quickly.
  - Be sure to [prevent abuse](https://developers.google.com/search/docs/monitor-debug/prevent-abuse) on your site.
  - If you want to provide a limited number of views to visitors without a subscription or login, read about [flexible sampling](https://developers.google.com/search/docs/appearance/flexible-sampling) to learn some best practices about providing limited access to your content.
  - See how to [indicate subscription and paywalled content](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) on your site to Google while still enabling crawling.
  - See how to use `meta` tags to [limit text or image use when generating search result snippets](https://developers.google.com/search/docs/crawling-indexing/special-tags).
  - Consider using [AMP](https://amp.dev) or [Web Stories](https://amp.dev/about/stories/) for fast-loading content.
- **Other sites** (for example, sites about businesses, books, apps, scholarly works): See [other Google services](https://developers.google.com/search/docs/fundamentals/get-on-google) where you can post your information.
- See if [Google supports a Search feature specific for your content type](https://developers.google.com/search/docs/appearance/structured-data/search-gallery). Google supports specialized Search features for recipes, events, job posting sites, and more.

## Manage the user experience

Providing a good user experience should be your site's top goal, and a good user experience
is a ranking factor. There are many elements to providing a good user experience; here are a
few of them.

[Google recommends that websites use HTTPS](https://developers.google.com/search/blog/2018/12/why-how-to-secure-your-website-https),
rather than HTTP, to improve user and site security. Sites that use HTTP
can be marked as "not secure" in the Chrome browser.
[Learn how to secure your site with HTTPS](https://web.dev/articles/enable-https).

A fast page usually beats a slow page in user satisfaction. You can use the
[Core Web Vitals report](https://search.google.com/search-console/core-web-vitals)
to see your site-wide performance numbers, or [PageSpeed Insights](https://pagespeed.web.dev/)
to test performance for individual pages. You can learn more about building fast
pages on the [web.dev site](https://web.dev/explore/fast). Also consider
using [AMP](https://amp.dev/about/stories/) for fast pages.

### Mobile considerations

With [over 60 percent of the global internet population using a mobile device to go online](https://www.statista.com/topics/779/mobile-internet/#topicOverview),
it's important that your site be mobile-friendly. Google now uses a mobile crawler as the
default crawler for websites.
[Read about how to make your site mobile friendly](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).

## Control your search appearance

Google provides [many kinds of search result features and experiences in Google Search](https://developers.google.com/search/docs/appearance/search-result-features),
including review stars and special result types for specific types of information such as
events or recipes. See which ones are appropriate for your site and consider implementing them.
You can [provide a favicon](https://developers.google.com/search/docs/appearance/favicon-in-search)
to show in search results for your site. You can also [provide an article date](https://developers.google.com/search/docs/appearance/publication-dates)
to appear in search results.

Be sure to read the articles on how to help Google
provide good [titles links](https://developers.google.com/search/docs/appearance/title-link) and
[snippets](https://developers.google.com/search/docs/appearance/snippet). You can also restrict the snippet length, or omit it
entirely if you wish. See how to use `meta` tags to [limit text or image use when generating search result snippets](https://developers.google.com/search/docs/appearance/snippet#nosnippet).

## Using Search Console


Search Console offers a broad range of reports to help you monitor and optimize your site
performance on Google Search. Learn more about [what reports to use](https://developers.google.com/search/docs/advanced/guidelines/search-console).







# Technical SEO Techniques and Strategies | Google Search Central

# Maintaining your website's SEO

If your site is on Google and you're familiar with the [fundamentals of SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), there are more
things you can do to improve how your site appears on Google. As you manage and maintain your
website, you may come across more unique scenarios that affect Google Search. This guide covers
more in-depth SEO tasks, such as preparing for a site move or managing a multi-lingual site.

## Control how Google crawls and indexes your site

Read our guide to understand [how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works);
if you don't understand the crawl/index/serving pipeline well, it
will be difficult to debug issues or anticipate Search behavior on your site.

### Duplicate content


Be sure that you understand what
[canonical pages are](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#definition),
and how they affect crawling and indexing of your site.

### Resources

Be sure that any resources (images, CSS files, and so on) or pages that Google is meant to
crawl are accessible to Google; that is, they are not blocked by any robots.txt rules and are
accessible to an anonymous user. Inaccessible pages will not appear in the
[Page Indexing report](https://search.google.com/search-console/index),
and the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
will show them as not crawled. Blocked resources are shown only at the
individual URL level, in the URL Inspection tool. If important resources on a page are blocked,
this can prevent Google from crawling your page properly. Use the URL Inspection tool to render
the live page to verify whether Google sees the page as you expect.

### Robots.txt

Use robots.txt rules to prevent crawling, and sitemaps to encourage crawling. Block crawling
of duplicate content on your site, or unimportant resources (such as small, frequently used
graphics such as icons or logos) that might overload your server with requests. Don't use
robots.txt as a mechanism to prevent indexing; use the `noindex` tag or login
requirements for that. [Read more about blocking access to your content.](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share)

### Sitemaps

Sitemaps are a very important way to tell Google which pages are important to your site, and
also provide additional information (such as update frequency), and are very important for
crawling non-textual content (such as images or video). Although Google won't limit crawling
to pages listed in your sitemaps, it will prioritize crawling these pages. This is especially
important for sites with rapidly changing content, or with pages that might not be discovered
through links. Using sitemaps helps Google discover and prioritize which pages to crawl on
your site. [Read all about sitemaps here.](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

### Internationalized or multi-lingual sites

If your site includes multiple languages, or is targeted at users in specific locales:

- [Read about
  multi-regional and multi-lingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) for high-level advice on how to manage sites that have localized content for different languages or regions.
- [Use hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions) to tell Google about different language variations of pages on your site.
- If your site adapts the content of its pages based on the locale of the request, read [how this can affect Google's crawl of your site](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages).

### Migrating a page or a site

On the occasion that you might need to move a single URL or even a whole site, follow these guidelines:

#### Migrating a single URL

If you move a page permanently to another location, don't forget
[to implement `301` redirects for your
page](https://developers.google.com/search/docs/crawling-indexing/301-redirects). If the move is only temporary for some reason, return `302` instead to tell
Google to continue to crawl your page.

When a user requests a page that has been removed, you can create a custom `404` page to
provide a better experience. Just be sure that when a user requests a page that is no longer
there, you return a true `404` error, not a [`soft 404`](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#soft-404-errors).

#### Migrating a site

If you're migrating an entire site, implement all the `301` and sitemap changes you need, then
tell Google about the move so that we can start crawling the new site and forwarding your
signals to the new site.
[Learn how to migrate your site.](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

### Follow crawling and indexing best practices

- **[Make your links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#crawlable-links).**
- **[Use `rel=nofollow`](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
  for paid links**, links that require login, or untrusted content (such as user-submitted content) to avoid passing your quality signals on to them, or having their bad quality reflect on you.
- **[Managing your crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)**: If your site is particularly large (hundreds of millions of pages that change periodically, or perhaps tens of millions of pages that change frequently), Google might not be able to crawl your entire site as often as you'd like, so you might need to point Google to the most important pages on your site. The best mechanism for doing so at present is to list your most recently updated or most important pages in your sitemaps, and hiding your less important pages using robots.txt rules.
- **JavaScript usage** : Follow [Google's recommendations for JavaScript on websites](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- **Multi-page articles**: If you have an article broken into several pages, be sure that there are prominent next and previous links for users to click (and that these are crawlable links). That's all you need for the page set to be crawled by Google.
- **Infinite scroll pages** : Google can have trouble scrolling through infinite scroll pages; provide a paginated version if you want the page to be crawled. [Learn more about search-friendly infinite scroll pages.](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading#paginated-infinite-scroll)
- **Block access to URLs that change state,** such as posting comments, creating accounts, adding items to a cart, and so on. Use [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) to block these URLs.
- Review the [list of which file types are indexable by Google](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types).
- In the unlikely situation that **Google seems to be crawling your site too
  much** , you can [reduce the crawl rate](https://developers.google.com/search/docs/crawling-indexing/reduce-crawl-rate) for your site. However, this should be a rare occurrence.
- If your site is still HTTP, we recommend [migrating to HTTPS](https://web.dev/articles/enable-https), for your [users' security, as well as your own](https://developers.google.com/search/blog/2018/12/why-how-to-secure-your-website-https).

## Help Google understand your site

Put key information in text, not graphics, on the site. Although Google can parse and index
[many file types](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types),
text is still the safest bet to help us understand the content of the page. If
you use non-text content, or if you want to provide additional guidance about the content of
the site, add [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) to your
pages to help us understand your content (and in some cases, provide special search features
such as [rich results](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)).

If you feel comfortable with HTML and basic coding, you can add structured data by hand
following the [developer guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
If you want a little help, you can use the WYSIWYG [Structured Data Markup helper](https://support.google.com/webmasters/answer/3069489)
to help you generate basic structured data for you.

If you don't have the ability to add structured data to your pages, you might use the
[Data Highlighter tool](https://support.google.com/webmasters/answer/2753960),
which lets you highlight portions of a page and tell Google what each section
represents (an event, a date, a price, and so on). This is simple, but it can break if you
change the layout of your page.

[Read more about helping Google understand your site content.](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#understand_your_content)

## Follow our guidelines

> [!CAUTION]
> **Caution** : Be sure to follow our [Search Essentials](https://developers.google.com/search/docs/essentials). Some of these are recommendations and best practices; others can lead to a site being removed from the Google index if you do not follow them.

### Content-specific guidelines

If you have specific types of content on your site, here are some recommendations for getting
them on Google in the best way:

- **Video** : Be sure to follow our [video best practices](https://developers.google.com/search/docs/appearance/video) to enable Google to find, crawl, and show results for videos hosted on your site.
- **Images** : Follow our [image best practices](https://developers.google.com/search/docs/appearance/google-images) to get your images to appear in Search. You can show additional information about your image in Google Images by [providing image metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) on the image host page. To block an image from being indexed, [use a robots.txt `Disallow` rule](https://developers.google.com/search/docs/crawling-indexing/prevent-images-on-your-page).
- **For children:** If your content is specifically for children, [tag your pages or site as child-directed](https://developers.google.com/search/docs/advanced/guidelines/tag-child-directed-treatment) in order to comply with the Children's Online Privacy Protection Act ([COPPA](https://business.ftc.gov/privacy-and-security/childrens-privacy)).
- **Adult sites** : If your site (or specific pages) contain adult-only content, you might consider [tagging it as adult content](https://developers.google.com/search/docs/crawling-indexing/safesearch), which will filter it in SafeSearch results.
- **News:** If you run a news site, here are some important considerations:
  - If you have news content, be sure to read the [Google Publisher Center help documentation](https://support.google.com/news/publisher-center/).
  - In addition, create a [News sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap) to help Google discover content more quickly.
  - Be sure to [prevent abuse](https://developers.google.com/search/docs/monitor-debug/prevent-abuse) on your site.
  - If you want to provide a limited number of views to visitors without a subscription or login, read about [flexible sampling](https://developers.google.com/search/docs/appearance/flexible-sampling) to learn some best practices about providing limited access to your content.
  - See how to [indicate subscription and paywalled content](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) on your site to Google while still enabling crawling.
  - See how to use `meta` tags to [limit text or image use when generating search result snippets](https://developers.google.com/search/docs/crawling-indexing/special-tags).
  - Consider using [AMP](https://amp.dev) or [Web Stories](https://amp.dev/about/stories/) for fast-loading content.
- **Other sites** (for example, sites about businesses, books, apps, scholarly works): See [other Google services](https://developers.google.com/search/docs/fundamentals/get-on-google) where you can post your information.
- See if [Google supports a Search feature specific for your content type](https://developers.google.com/search/docs/appearance/structured-data/search-gallery). Google supports specialized Search features for recipes, events, job posting sites, and more.

## Manage the user experience

Providing a good user experience should be your site's top goal, and a good user experience
is a ranking factor. There are many elements to providing a good user experience; here are a
few of them.

[Google recommends that websites use HTTPS](https://developers.google.com/search/blog/2018/12/why-how-to-secure-your-website-https),
rather than HTTP, to improve user and site security. Sites that use HTTP
can be marked as "not secure" in the Chrome browser.
[Learn how to secure your site with HTTPS](https://web.dev/articles/enable-https).

A fast page usually beats a slow page in user satisfaction. You can use the
[Core Web Vitals report](https://search.google.com/search-console/core-web-vitals)
to see your site-wide performance numbers, or [PageSpeed Insights](https://pagespeed.web.dev/)
to test performance for individual pages. You can learn more about building fast
pages on the [web.dev site](https://web.dev/explore/fast). Also consider
using [AMP](https://amp.dev/about/stories/) for fast pages.

### Mobile considerations

With [over 60 percent of the global internet population using a mobile device to go online](https://www.statista.com/topics/779/mobile-internet/#topicOverview),
it's important that your site be mobile-friendly. Google now uses a mobile crawler as the
default crawler for websites.
[Read about how to make your site mobile friendly](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).

## Control your search appearance

Google provides [many kinds of search result features and experiences in Google Search](https://developers.google.com/search/docs/appearance/search-result-features),
including review stars and special result types for specific types of information such as
events or recipes. See which ones are appropriate for your site and consider implementing them.
You can [provide a favicon](https://developers.google.com/search/docs/appearance/favicon-in-search)
to show in search results for your site. You can also [provide an article date](https://developers.google.com/search/docs/appearance/publication-dates)
to appear in search results.

Be sure to read the articles on how to help Google
provide good [titles links](https://developers.google.com/search/docs/appearance/title-link) and
[snippets](https://developers.google.com/search/docs/appearance/snippet). You can also restrict the snippet length, or omit it
entirely if you wish. See how to use `meta` tags to [limit text or image use when generating search result snippets](https://developers.google.com/search/docs/appearance/snippet#nosnippet).

## Using Search Console


Search Console offers a broad range of reports to help you monitor and optimize your site
performance on Google Search. Learn more about [what reports to use](https://developers.google.com/search/docs/advanced/guidelines/search-console).







