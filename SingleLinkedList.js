/* Name: Single Linked List Data Structure Implementation
 * Author: Brandon Bays
 * Date: May 3 / 2023
 * Description: Simple single linked list implementation
 *
 */

// Single Linked List Node Class 
class SingleLinkedListNode {
  // Constructor
  // This allows us to pass both data and the next pointer into adding a new node. But if no pointer is passed, it will set it to null for us.
  constructor(data, next = null) {
    this.data = data; // Variable to store the data in
    this.next = next; // Pointer needed for singular linked lists to point to next node
  }
} // End Single Linked List Node Class

// Single Linked List Class
class SingleLinkedList {
  // Constructor to create a new node with a head, tail, and length reference
  constructor() {
    this.head = null; // Initially the head reference is null on creation of a new list
    this.tail = null; // Initially the tail reference is null on creation of a new list
    this.length = 0; // Initially length is set to 0 on creation of a new list
  }

  // Method to check if the list for empty
  isEmpty() {
    return this.length == 0;
  }

  // Method to return the size of the list
  size_of_list() {
    console.log(this.length);
  }

  // Add method to add a new node onto the end of the list
  add(data) {
    // Local Variables
    const newNode = new SingleLinkedListNode(data); // Create a new node with the data passed into it
    // Check if the list is empty
    if (!this.head) { // If list is empty,
      this.head = newNode; // Set the head of list to the new node
      this.tail = newNode; // Set the tail of the list to the new node
    } else { // Otherwise,
      this.tail.next = newNode; // Set the tail.next property to the new node since its last node in list.
      this.tail = newNode; // set the tail property to the new node
    }
    this.length++; // Update the length of the list
    return this; // Return the list
  }

  // Remove method to remove the last node of the list
  remove() {
    // If the list is already empty
    if (!this.head) {
      return; // Do nothing and return
    }
    // If the list has only 1 node left
    if (this.length === 1) { // Check if length is only 1
      this.head = null; // Set the head to null 
      this.tail = null; // Set the tail to null
      this.length = 0; // Set length = to 0
      return; // Return 
    }
    // If the list has more than 1 node
    let current = this.head; // Create a current variable to store the heads pointer 
    let newTail = null; // Create a new tail variable and set it to null
    // Loop through the list
    while (current) {
      if (current.next) { // Check if there is a next value in the list
        newTail = current; // If there is, set new tail to the current
      }
      current = current.next; // Once at end set current = to the current.next 
    }
    const deletedNode = this.tail; // Create a variable to store the node to be deleted
    this.tail = newTail; // Set the tail = to the new tail
    this.tail.next = null; // Set the tail.next pointer to null
    this.length--; // Decrement the length of the list
    return deletedNode; // Return the deleted node
  }

  // Shift method to delete a node at the beginning of a list
  shift() {
    // Check to see if the list is empty
    if (!this.head) { // If there is no head
      return null; // Return null
    }
    // Check to see if there is only 1 item in list
    if (this.length === 1) { // If there is only 1 item in list then,
      this.head = null; // set th ehead to null
      this.tail = null; // Set the tail to null
      this.length = 0; // Set the list length to 0
      return; // Return
    }
    //If more than 1 node in list
    const currentHead = this.head; // Create a current head variable to store the initial head
    const newHead = currentHead.next; // Create a new head variable to store the currents.next into
    this.head = newHead; // set the new head to lists head
    this.length--; // Decrement the list

    return currentHead; // Return the removed node
  }

  // Unshift method to add a new node to the beginning of the list
  unshift(data) {
    // Local Variables
    const newNode = new SingleLinkedListNode(data); // Create a new node and pass it the data

    // Check to see if the list is empty
    if (this.length === 0) { // If list is empty,
      this.head = newNode; // Set the head to the new node
      this.tail = newNode; // Set the tail to the new node
      this.length = 1; // Set the length to 1
      return; // Return 
    }
    // So long as list wasn't empty
    const currentHead = this.head; // Create a curent head variable to store initial head
    const newHead = newNode; // Create a new head variable and set it to the new node
    this.head = newHead; // set lists head to new node
    newHead.next = currentHead; // set the new heads next to the old head
    this.length++; // Increment the lists length 
    return newHead; // return the newly added node
  }

  // Get method to access a specific node at a given index
  get(index) {
    // Check if the index is outside the list
    if (index < 0 || index >= this.length) { // If the index is less than 0 or greater than size of list, then
      return null; // return null
    }
    let counter = 0; // Using a counter to see when it = length
    let current = this.head; // Create a new target variable to store the initial head in
    while (counter != index) { // Loop through the list until counter = index
      current = current.next; // Set current equal t oteh next
      counter++; // Increment counter
    }
    return current; // Return the property you wanted
  }

  // Set method to update a value at a specific index
  set(index, data) {
    const target = this.get(index); // Create a target variable and call the get method and pass the index you want 
    if (target) { // Once the target that you wanted is returned 
      target.data = data; // set the data to the new data
      return true; // return true if this was completed
    }
    return false; // return false if failed to update data
  }

  // Insert method to node a node in a specific place
  insert(index, data) {
    // If index falls outside the list
    if (index < 0 || index > this.length) { // Index is less than 0 or greater than list length, then
      return false; // return false 
    }
    // If you are inserting at the end of the list
    if (index === this.length) { // If index equals list length, then
      this.add(data); // Call the add method
      return true; // Return true
    }
    // If you are inserting data at beginning
    if (index === 0) { // If index = 0, then
      this.unshift(data); // Call the unshift method
      return true; // Return true
    }
    // If you are inserting somewhere thats not beggining or end
    const newNode = new SingleLinkedListNode(data); // Create a new node
    const previous = this.get(index - 1); // Call get method with the index -1 to get the previous node before insert
    const current = previous.next; // set the variable current equal to the previous.next you just grabbed
    previous.next = newNode; // set the previous.next to the new node 
    newNode.next = current; // set the new nodes next to the current. This completes the link back to list
    this.length++; // Increment list 
    return true; // Return true if the new node was successfully added
  }

  // Remove method to delete a node at a specific index
  removeIndex(index) {
    // Check to see if index is outside the list
    if (index < 0 || index >= this.length) { // If the index is less than 0 or greater than list length
      return undefined; // Return false
    }
    // If removing first node
    if (index === 0) { // If index = 0
      return this.shift(); // Call unshift method
    }
    // If removing last node
    if (index === this.length - 1) { // If the index is 1 less than length of list
      return this.remove(); // Call remove method
    }
    // If removing anywhere that isn't first or last 
    const previous = this.get(index - 1); // Get the previous node 1 index away
    const removed = previous.next; // Set the after to 2 nodes after previous
    previous.next = removed.next; // Set the next to the saved after variable to reconnect the list
    this.length--; // Decrement the list length
    return removed; // Return True
  }

  // Reverse method to reverse the list from head to tail to tail to head
  reverse() {
    // Local Variables
    let movingNode = this.head; // Set the head to be changed to tail 
    this.head = this.tail; // Set the current head to the tail
    this.tail = movingNode; // Set the tail to the old head
    let nextNode; // Create a next node variable 
    let previousNode = null; // SEt previous node to null
    // Loop through the list
    for (let i = 0; i < this.length; i++) {
      nextNode = movingNode.next; // Save the temp variable for the next iteration of the list
      movingNode.next = previousNode; // Reverse the pointer
      // Update Variables for next iteration
      previousNode = movingNode;
      movingNode = nextNode;
    }
  }

  // Print List Method to display the list
  printList() {
    let current = this.head; // Set current head to variable
    let result = " "; // Empty string to store list
    while (current != null) {
      result += current.data + " ";
      current = current.next;
    }
    return result;
  }

} //End Single Linked List Class

// Main Program
// Create a new linked list object
let list = new SingleLinkedList();

// Add items to end of list
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);
list.add(7);
list.add(8);
list.add(9);
list.add(0);
console.log("Original List: " + list.printList());

// Add items to beginning of list
list.unshift(0)
console.log("Add 0 to beginning of list: " + list.printList());

// Add items to middle of list
list.insert(3, "A")
console.log("Insert A at index 3: " + list.printList());

// Remove Item from end of list
list.remove();
console.log("Remove 0 at end of list: " + list.printList());

// Remove item from beginning of list
list.shift();
console.log("Remove 0 from beginning of list: " + list.printList());

// Remove an item in middle of list
list.removeIndex(2);
console.log("Remove the A: " + list.printList());

// Display List
console.log("Final List: " + list.printList());

// Get size of list
list.sizeOfList();

// Is list empty
console.log("Is List Empty?: " +list.isEmpty());
