// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let id = 0;

class Neighborhood{
  constructor(name){
    this.id = ++id
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries(){
    return [...new Set(store.deliveries.filter(delivery => delivery.neighborhoodId === this.id))]
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals(){
    const allMeals = this.deliveries().map(delivery => store.meals.find(meal => meal.id === delivery.mealId))
    return [...new Set(allMeals)]
  }

}

class Customer{
  constructor(name,neighborhoodId){
    this.id = ++id
    this.neighborhoodId = neighborhoodId
    this.name = name
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce((accumulator,meal)=>(accumulator += meal.price),0)
  }
}

class Meal{
  constructor(title,price){
    this.id = ++id
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    const allCustomers = this.deliveries().map(delivery => delivery.customer())
    return [...new Set(allCustomers)]
  }

  static byPrice(){
    return store.meals.sort((a,b) => a.price < b.price)
  }
}

class Delivery{
  constructor(mealId,neighborhoodId,customerId){
    this.id = ++id
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
