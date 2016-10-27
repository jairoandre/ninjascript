Ninjascript
===

Descrição
---

Aplicação teste de cadastro de usuários e gerenciamento de postagens.

[Heroku link](https://young-gorge-62225.herokuapp.com/)

Endpoints criados até o momento:

- `GET` api/users/
- `GET` api/posts/
- `POST` api/users/add
- `POST` api/posts/add
- `GET` api/users/:id
- `GET` api/posts/:id

Exemplo:

[http://localhost:3000/api/users](http://localhost:3000/api/users)

Stack
---

Tecnologias utilizadas nesta aplicação::

- NodeJS
- MongoDB (Mongoose)
- Express
- Webpack
- ReactJS
- LESS
- ES 6 / Babel (Module Loading)

Modelagem
---

#### Usuário

```javascript
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  birthdate: Date,
  gender: String,
  avatar: String,
  password: String,
})

export function getUserModel() {
  return mongoose.model('User', userSchema);
}
```

#### Post

```javascript
import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  text: String,
  attachments: [String],
  shared_ids: [Schema.Types.ObjectId],
  comments: [{
    author_id: Schema.Types.ObjectId,
    text: String,
    created_at: Date
  }]
})

export function getPostModel() {
  return mongoose.model('Post', postSchema);
}

```
Pré requisitos
---

NodeJS instalado

Scripts
---

Iniciar serviço da [aplicação](http://localhost:3000):

```bash
$ npm start
```

Build:

```bash
$ npm run build
```
