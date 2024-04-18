export const fetchNewsData = async (category, selectedSource) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/news/");
      const data = await response.json();
      const allArticles = data.flatMap((category) => category.articles);
  
      // Filter out articles with no url and articles that are not in the selected category
      const filteredArticles = allArticles.filter(
        (article) =>
          article.url !== "[Removed]" &&
          (category === "topHeadlines" || data.find((cat) => cat.category === category)?.articles.includes(article))
      );
  
      // Replace missing images with placeholders
      const articlesWithPlaceholders = filteredArticles.map((article) => ({
        ...article,
        urlToImage: article.urlToImage === "not_available" ? "not_available" : article.urlToImage,
      }));
  
      // Count news sources
      let counts = {};
      articlesWithPlaceholders.forEach((article) => {
        counts[article.source] = counts[article.source] ? counts[article.source] + 1 : 1;
      });
  
      // Filter articles by selected source if selected from doughnut chart
      let articles = articlesWithPlaceholders;
      if (selectedSource) {
        articles = articlesWithPlaceholders.filter((article) => article.source === selectedSource);
      }
  
      return { articles, counts };
    } catch (error) {
      console.error("Error fetching news data:", error);
      throw error;
    }
  };