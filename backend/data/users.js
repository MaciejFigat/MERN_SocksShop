import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@somethin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Donald T.',
    email: 'donald@somethin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Joe Biden',
    email: 'joe@somethin.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
