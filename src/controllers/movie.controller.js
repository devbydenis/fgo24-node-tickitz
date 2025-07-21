const {constants: http} = require("http2");
const { Movie, Cast, Genre, Director } = require('../models');
const { Op } = require('sequelize'); //operator di sequileze

exports.getAllMovies = async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // filtering movie
    const whereClause = {};
    if (req.query.status) {
      whereClause.status = req.query.status; // now playing, coming soon, ended
    }
    if (req.query.genre) {
      whereClause['$genres.name$'] = req.query.genre;
    }

    // sorting moviw
    const order = [];
    if (req.query.sortBy) {
      const [field, direction] = req.query.sortBy.split(':');
      order.push([field, direction.toUpperCase()]);
    } else {
      order.push(['popularity', 'DESC']); // Default sort by popularity
    }

    const { count, rows: movies } = await Movie.findAndCountAll({
      where: whereClause,
      include: [
        { 
          model: Genre, 
          as: 'genres',
          attributes: ['id', 'name'],
          through: { attributes: [] } 
        }
      ],
      order,
      limit,
      offset,
      distinct: true 
    });

    const totalPages = Math.ceil(count / limit);

    res
      .status(http.HTTP_STATUS_OK)
      .json({
        success: true,
        message: 'Movies retrieved successfully',
        data: {
          movies,
          pageInfo: {
            totalItems: count,
            totalPages,
            currentPage: page,
            itemsPerPage: limit
          }
        }
      })
  } catch (error) {
    console.error('Error getting movies:', error);
    res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: 'Failed to retrieve movies'
      })
  }
};


exports.getNowPlaying = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: { status: 'now playing' },
      order: [['popularity', 'DESC']],
      limit: 10
    });

    res
      .status(200)
      .json({
        success: true,
        message: 'Now playing movies retrieved',
        data: movies
      })
  } catch (error) {
    console.error('Error getting now playing:', error);
    res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: 'Failed to retrieve now playing movies'
      })
  }
};


exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: Cast,
          as: 'casts',
          attributes: ['id', 'actor_name', 'character_name'],
          through: { attributes: [] }
        },
        {
          model: Genre,
          as: 'genres',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Director,
          as: 'directors',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    });

    if (!movie) {
      return res
        .status(http.HTTP_STATUS_NOT_FOUND)
        .json({
          success: false,
          message: 'Movie not found'
        });
    }

    res
      .status(http.HTTP_STATUS_OK)
      .json({
        success: true,
        message: 'Movie details retrieved',
        data: movie
      });
  } catch (error) {
    console.error('Error getting movie details:', error);
    res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: 'Failed to retrieve movie details'
      }); 
  }
};


exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('query', query);
    if (!query) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false,
          message: 'Search query is required'
        });
    }

    const movies = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%` // Case-insensitive search
        }
      },
      limit: 10
    });

    res
      .status(http.HTTP_STATUS_OK)
      .json({
        success: true,
        message: 'Search results retrieved',
        data: movies
      });

  } catch (error) {
    console.error('Error searching movies:', error);
    res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: 'Failed to search movies'
      });
  }
};


exports.getMoviesByGenre = async (req, res) => {
  try {
    const genreName = req.params.genre;
    const genre = await Genre.findOne({
      where: { name: genreName }
    });

    if (!genre) {
      return res
        .status(http.HTTP_STATUS_NOT_FOUND)
        .json({
          success: false,
          message: 'Genre not found'
        });
    }

    const movies = await genre.getMovies({
      order: [['popularity', 'DESC']],
      limit: 20
    });

    res
      .status(http.HTTP_STATUS_OK)
      .json({
        success: true,
        message: `Movies in ${genreName} genre retrieved`,
        data: movies
      });
  } catch (error) {
    console.error('Error getting movies by genre:', error);
    res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: 'Failed to get movies by genre'
      })
  }
};