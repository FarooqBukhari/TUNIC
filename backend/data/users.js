import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'abubakarmunir15@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSuperAdmin: true,
  },
  {
    name: 'Aiza Naveed',
    email: 'aizanaveed1@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'SarmadIqbal',
    email: 'sarmadiqbal01@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Umair Ahmad',
    email: 'umair_ahmad1997@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },



]

export default users
