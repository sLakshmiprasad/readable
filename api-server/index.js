require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const categories = require('./categories');
const posts = require('./posts');
const comments = require('./comments');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/categories', (req, res) => {
  categories.getAll(req.token).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.get('/:category/posts', (req, res) => {
  posts.getByCategory(req.token, req.params.category).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.get('/posts', (req, res) => {
  posts.getAll(req.token).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.post('/posts', bodyParser.json(), (req, res) => {
  posts.add(req.token, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.get('/posts/:id', (req, res) => {
  posts.get(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.delete('/posts/:id', (req, res) => {
  posts
    .disable(req.token, req.params.id)
    .then(post => comments.disableByParent(req.token, post))
    .then(
      data => res.send(data),
      error => {
        console.error(error);
        res.status(500).send({
          error: 'There was an error.'
        });
      }
    );
});

app.post('/posts/:id', bodyParser.json(), (req, res) => {
  const { option } = req.body;
  const id = req.params.id;
  posts.vote(req.token, id, option).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.put('/posts/:id', bodyParser.json(), (req, res) => {
  posts.edit(req.token, req.params.id, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.get('/posts/:id/comments', (req, res) => {
  comments.getByParent(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.get('/comments/:id', (req, res) => {
  comments.get(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.put('/comments/:id', bodyParser.json(), (req, res) => {
  comments.edit(req.token, req.params.id, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.post('/comments', bodyParser.json(), (req, res) => {
  comments.add(req.token, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.post('/comments/:id', bodyParser.json(), (req, res) => {
  const { option } = req.body;
  comments.vote(req.token, req.params.id, option).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

app.delete('/comments/:id', (req, res) => {
  comments.disable(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.'
      });
    }
  );
});

if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.resolve(__dirname, '../front-end/build')));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(__dirname, '../front-end/build', 'index.html')
    );
  });
}

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port);
});
