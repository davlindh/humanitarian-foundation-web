import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const blogPosts = [
  {
    title: 'Empowering Communities through Clean Water',
    date: 'October 10, 2023',
    excerpt: 'Learn how HUFIDA is providing access to clean and safe drinking water in rural areas.',
    content: 'Full content about how HUFIDA is providing access to clean and safe drinking water in rural areas. This includes detailed information about the projects, the impact on the communities, and future plans.',
    image: '/images/blog1.jpg',
    rating: 4.5,
  },
  {
    title: 'Educational Programs Making a Difference',
    date: 'September 20, 2023',
    excerpt: 'Our educational programs are empowering children through education and skill development.',
    content: 'Full content about our educational programs, including success stories, detailed descriptions of the programs, and the impact on the children and communities.',
    image: '/images/blog2.jpg',
    rating: 4.0,
  },
  {
    title: 'DIY Solar Water Heater',
    date: 'November 5, 2023',
    excerpt: 'A step-by-step guide to building a low-cost solar water heater using locally available materials.',
    content: 'Full step-by-step guide to building a low-cost solar water heater, including materials needed, instructions, and tips for success.',
    image: '/images/blog3.jpg',
    rating: 5.0,
  },
  {
    title: 'Composting for Beginners',
    date: 'November 12, 2023',
    excerpt: 'Learn how to start composting at home with simple and effective methods.',
    content: 'Full guide on how to start composting at home, including benefits, methods, and tips for success.',
    image: '/images/blog4.jpg',
    rating: 4.8,
  },
];

const pressReleases = [
  {
    title: 'HUFIDA Launches New Healthcare Initiative',
    date: 'August 15, 2023',
    content: 'HUFIDA is excited to announce the launch of a new healthcare initiative aimed at improving healthcare facilities in underserved communities. This initiative will focus on providing essential medical supplies, training healthcare workers, and renovating healthcare centers.',
    rating: 4.2,
  },
  {
    title: 'Partnership with Global Aid Organization',
    date: 'July 30, 2023',
    content: 'We are proud to partner with Global Aid Organization to expand our reach and impact. This partnership will allow us to collaborate on various projects, share resources, and work together towards common goals.',
    rating: 4.0,
  },
];

const mediaGallery = [
  {
    title: 'Community Outreach Event',
    type: 'photo',
    url: '/images/gallery1.jpg',
  },
  {
    title: 'Healthcare Initiative Launch',
    type: 'video',
    url: 'https://www.youtube.com/embed/example',
  },
];

const News = () => {
  const [sortType, setSortType] = useState('date');
  const [expandedBlogPosts, setExpandedBlogPosts] = useState({});
  const [expandedPressReleases, setExpandedPressReleases] = useState({});

  const toggleBlogPost = (index) => {
    setExpandedBlogPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const togglePressRelease = (index) => {
    setExpandedPressReleases((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    if (sortType === 'rating') {
      return b.rating - a.rating;
    }
    return new Date(b.date) - new Date(a.date);
  });

  const sortedPressReleases = [...pressReleases].sort((a, b) => {
    if (sortType === 'rating') {
      return b.rating - a.rating;
    }
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="p-10 bg-base-200 text-center">
      <section className="mb-10">
        <h2 className="text-3xl font-bold">Latest News and Updates</h2>
        <div className="mt-4">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/your-video-id" title="HUFIDA Latest News" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold">Recent Achievements</h2>
        <div className="mt-4">
          <img src="/images/infographics/achievements-infographic.png" alt="HUFIDA Achievements Infographic" className="w-full h-auto" />
        </div>
      </section>

      <div className="mb-10">
        <label className="mr-2">Sort by:</label>
        <select onChange={(e) => setSortType(e.target.value)} value={sortType} className="select select-bordered">
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <section className="mb-10">
        <h2 className="text-3xl font-bold">Blog</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedBlogPosts.map((post, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure><img src={post.image} alt={post.title} /></figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p className="text-sm text-gray-500">{post.date}</p>
                <p>{expandedBlogPosts[index] ? post.content : post.excerpt}</p>
                <button onClick={() => toggleBlogPost(index)} className="btn btn-link">
                  {expandedBlogPosts[index] ? 'Read Less' : 'Read More'}
                </button>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((star, i) => (
                    <FaStar key={i} color={i < Math.round(post.rating) ? "#ffc107" : "#e4e5e9"} />
                  ))}
                  <span className="ml-2">{post.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold">Press Releases</h2>
        <div className="mt-4 space-y-4">
          {sortedPressReleases.map((release, index) => (
            <div key={index} className="p-4 bg-white shadow rounded">
              <h3 className="text-2xl font-bold">{release.title}</h3>
              <p className="text-sm text-gray-500">{release.date}</p>
              <p>{expandedPressReleases[index] ? release.content : `${release.content.substring(0, 100)}...`}</p>
              <button onClick={() => togglePressRelease(index)} className="btn btn-link">
                {expandedPressReleases[index] ? 'Read Less' : 'Read More'}
              </button>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((star, i) => (
                  <FaStar key={i} color={i < Math.round(release.rating) ? "#ffc107" : "#e4e5e9"} />
                ))}
                <span className="ml-2">{release.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold">Media Gallery</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mediaGallery.map((media, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              {media.type === 'photo' ? (
                <figure><img src={media.url} alt={media.title} /></figure>
              ) : (
                <div className="card-body">
                  <h2 className="card-title">{media.title}</h2>
                  <div className="video-responsive">
                    <iframe
                      width="560"
                      height="315"
                      src={media.url}
                      title={media.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;