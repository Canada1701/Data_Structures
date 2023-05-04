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
  sizeOfList() {
    console.log(this.length);
  }

  // Get Node At Index Method to return a specific node
  getNodeAtIndex(index) {
   // Case 1: Index out of bounds
    if (index >= this.length || index < 0) {  // If index less than 0 or greater than length of list
     return null; // Nothing to return
    } 
    // Case 2: Index is located within list
    let currentNode = this.head; // set current node to list head
    let currentIndex = 0; // Counter 
    while (currentIndex !== index) { // Loop through list until index matches counter
      currentNode = currentNode.next; // Set the current node to the next value and continue traversing
      currentIndex++; // Increment counter
    }
    return currentNode; // Return the current node
  }

  //change the node at the given index
  setNodeAtIndex(data, index) {
    const foundNode = this.getNodeAtIndex(index); //Create a new node and find the node using get Node At Index mehtod
    // Case 1:  Node found
    if (foundNode) { //if the node is found
      foundNode.data = data; // set the new data to the found node
      return foundNode; // Return found node
    }
    // Case 2: Node not found
    return null; // Nothing to return
  }

  //Add Method to add a node at the end of the list
  add(data) {
    //make a new Node
    const newNode = new SingleLinkedListNode(data); // Create a new node to be added
    // Case 1: List is empty
    if (!this.head) { //if list is empty
      this.head = newNode; // Set new node to head
      this.tail = newNode; // Set new node to tail
      // Case 2: If list is not empty
    } else {
      this.tail.next = newNode; // Set tail next pointer to new node
      this.tail = newNode; // set the tail to the new node
    }
    this.length++; // increment list length
    return this; // Return list
  }

  //Remove Method to remove a node from the end of list
  remove() {
    // Case 1: List is empty
    if (!this.tail) { // If list is empty
      return false; // Nothing to return 
    }
    // Case 2: List has more than 1 node
    const poppedNode = this.tail; // Set the tail node to be removed
    if (this.head !== this.tail) { // If list head doesn't equal the tail. Meaning more than 1 node in list
      const newTail = this.getNodeAtIndex(this.length - 2); // Find the new tail of the list which is second from end
      newTail.next = null; // Remove tails pointer
      this.tail = newTail; // Set new tail to tail
    } else { // If only 1 node in list
      this.head = null; // Set head pointer to null
      this.tail = null; // Set tail pointer to null
    }
    this.length--; // Decrement list length
    return poppedNode; // Return removed node
  }

  // Unshift Method to add a new node to beginning of list 
  unshift(data) {
    const newNode = new SingleLinkedListNode(data);
    // Case 1: List is empty
    if (!this.head) { // If list is empty
      this.head = newNode; // Set the head to new node
      this.tail = newNode; // Set the tail to new node
    } else { // Case 2: List is not empty
      newNode.next = this.head; // Set new nodes next to the current head of list
      this.head = newNode; // Set the head to the new node
    }
    this.length++; // Increment the list length
    return this; // Return list
  }

  //Shift Method to remove the first item in list
  shift() {
    // Case 1: If list is empty
    if (!this.head) { //if list is empty
      return false; // Nothing to return
    }
    // Case 2: List that will be left with only 1 node in it
    const shiftedNode = this.head; // Get the current head to be shifted
    const newHead = this.head.next; // Get new head (could be NULL if list is length 2)
    if (!newHead) { // If newHead is null
      this.tail = newHead; // Assign the tail to newHead(null)
    }
    this.head = newHead; // Assign the head to the new head
    this.length--; // Decrement the list
    return shiftedNode; // Return shiftednode
  }

  //Insert At Index Method to insert a new node at a specific index 
  insertAtIndex(index, data) {
    // Case 1: Index not valid
    if (index < 0 || index > this.length) { //if index less than 0 or outside the length of the list
      return false; // Nothing to return
    }
    // Case 2: Insert into beginning of list
    if (index === 0) { // If index is at beginning
      return this.unshift(data); // Use already built in unshift method
    }
    // Case 3: Insert into end of list
    if (index === this.length) { // If index is at end of list
      return this.add(data); // Use already built push method
    }
    // Case 4: Insert anywhere into list that is not beginning or end and index is valid
    const newNode = new SingleLinkedListNode(data); // Create a new node
    const after = this.getNodeAtIndex(index); // Call the get node method for setting the after pointer
    const before = this.getNodeAtIndex(index - 1); // Call the get node method for setting the before pointer
    newNode.next = after; // Set the new nodes next to the next node you stored in the pointer
    before.next = newNode; // Set the old nodes next to the new node
    this.length++; // Increment the list length
    return this; // Return list
  }

  // Remove From Index method to delete a node from a given index
  removeFromIndex(index) {
    // Case 1: Index not valid
    if (index < 0 || index >= this.length) { // If index less than 0 or outside the length of the list
      return false; // Nothing to return
    }
    // Case 2: Only 1 node in list
    if (index === 0) { // If index is at beginning
      return this.shift(); // Use already built in shift method
    }
    // Case 3: Node to be removed is at end of list
    if (index === this.length - 1) { // If index is the length - 1
      return this.remove(); // Use already built in remove method
    }
    // Case 4: More than 1 node, not empty, and node ain't at end of list
    const before = this.getNodeAtIndex(index - 1); // New node is the node before the node we want to delete 
    const removedNode = this.getNodeAtIndex(index); // New node is the node we want to delete
    before.next = removedNode.next; // Set the node to be deleted next pointer to the node that was before it
    removedNode.next = null; // Delete the pointer to the removed nodes next
    this.length--; // Decrement the list length
    return removedNode; // Return removed node
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
    while (current != null) { // Loop through list while its not empty
      result += current.data + " "; // Append the current nodes data to results
      current = current.next; // Go to next node
    }
    return result; // Return the list of results
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
list.insertAtIndex(3, "A")
console.log("Insert A at index 3: " + list.printList());

// Remove Item from end of list
list.remove();
console.log("Remove 0 at end of list: " + list.printList());

// Remove item from beginning of list
list.shift();
console.log("Remove 0 from beginning of list: " + list.printList());

// Remove an item in middle of list
list.removeFromIndex(2);
console.log("Remove the A aat index 2: " + list.printList());

// Display List
console.log("Final List: " + list.printList());

// Get size of list
list.sizeOfList();

// Is list empty
console.log("Is List Empty?: " + list.isEmpty());

// Get node at index
console.log("Node at index 2 is: " + list.getNodeAtIndex(2).data);

// Change the data at Index
console.log("Node at index 2 changed to: " + list.setNodeAtIndex(2,2).data);
