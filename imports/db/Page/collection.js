// Meteor
import { Mongo } from 'meteor/mongo'

// Collection
export const Pages = new Mongo.Collection('Pages')

// Security Policy (no direct insert on client side)
Pages.allow({
  insert() {
    return false
  },
  update() {
    return false
  },
  remove() {
    return false
  },
})

Pages.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  },
})
