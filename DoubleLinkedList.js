/* Name: Single Linked List Data Structure Implementation
 * Author: Brandon Bays
 * Date: May 3 / 2023
 * Description: Simple double linked list implementation
 *
 */

// Double Linked List Node Class
class DoubleLinkedListNode {
  // Constructor
  // This allows us to pass both data and next/previous pointer, into adding a new node. But if no pointer is passed, it will set it to null for us.
  constructor(data, next = null, prev = null) {
    this.data = data; // Variable to store the data in
    this.next = next; // Pointer needed for double linked lists to point to next node
    this.prev = prev; // Pointer needed for double linked list traversal to point to previous node
  }
} // End Double Linked List Node Class

// Double Linked List Class
class DoubleLinkedList {
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
    if (index >= this.length || index < 0) { // If index less than 0 or greater than length of list
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
    const newNode = new DoubleLinkedListNode(data); // Create a new node to be added
    // Case 1: List is empty
    if (!this.head) { //if list is empty
      this.head = newNode; // Set new node to head
      this.tail = newNode; // Set new node to tail
      // Case 2: If list is not empty
    } else {
      this.tail.next = newNode; // Set tail next pointer to new node
      newNode.prev = this.tail; // Set new nodes previous pointer to the old tail
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
    const newTail = this.tail.prev; // Set new tail to a variable (Could be null)
    if (newTail) { // If new Tail was null
      newTail.next = null; // Delete new tails next pointer to popped node
      this.tail.prev = null; // Delete tail previous pointer to popped node
    } else { // If only 1 node in list
      this.head = null; // Set head to null in case new tail was null
    }
    this.tail = newTail; // Set tail to new tail
    this.length--; // Decrement the list length
    return poppedNode; // Return removed node
  }

  // Unshift Method to add a new node to beginning of list 
  unshift(data) {
    const newNode = new DoubleLinkedListNode(data);
    // Case 1: List is empty
    if (!this.head) { // If list is empty
      this.head = newNode; // Set the head to new node
      this.tail = newNode; // Set the tail to new node
    } else { // Case 2: List is not empty
      this.head.prev = newNode; // Set the previous to the new node to point to itself
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
    const shiftedNode = this.head; // Set shifted node to current head
    const newHead = this.head.next; // Set new head to the current heads next value (might be null)
    if (this.head !== this.tail) { // If list head doesn't equal the tail - Meaning more than 1 node
      newHead.prev = null; // Set new heads previous to null
      shiftedNode.next = null; // Set shifted heads next to null
    } else { // If only 1 node in list
      this.tail = null; // Set the tail to null
    }
    this.head = newHead; // Set head to new head
    this.length--; // Decrement the list length
    return shiftedNode; // Return node removed
  }

  //Insert At Index Method to insert a new node at a specific index 
  insertAtIndex(index, data) {
    // Case 1: Index not valid
    if (index < 0 || index > this.length) { //if index less than 0 or outside the length of the list
      return false; // Nothing to return
    }
    // Case 2: Insert into beginning of list
    if (index === 0) { // If index is at beginning
      this.unshift(data); // Use already built in unshift method
    }
    // Case 3: Insert into end of list
    else if (index === this.length) { // If index is at end of list
      this.add(data); // Use already built push method
      // Case 4: Insert anywhere into list that is not beginning or end and index is valid
    } else {
      const newNode = new DoubleLinkedListNode(data); // Create a new node
      const after = this.getNodeAtIndex(index); // Call the get node method for setting the after pointer
      const before = after.prev // Set pointer to what came before
      after.prev = newNode; // Set previous for what comes after node to new node
      before.next = newNode; // Set the before next to the new node
      newNode.next = after; // set the new nodes next to after
      newNode.prev = before; // Set new nodes previous to before
      this.length++; // Increment the list length
    }
    return this; // Return list
  }

  // Remove From Index method to delete a node from a given index
  removeFromIndex(index) {
  	// Declare Variables
  	let removedNode; // Declare but not instantiate
    // Case 1: Index not valid
    if (index < 0 || index >= this.length) { // If index less than 0 or outside the length of the list
      return false; // Nothing to return
    }
    // Case 2: Only 1 node in list
    if (index === 0) { // If index is at beginning
      this.shift(); // Use already built in shift method
    }
    // Case 3: Node to be removed is at end of list
    else if (index === this.length - 1) { // If index is the length - 1
      this.remove(); // Use already built in remove method
      // Case 4: More than 1 node, not empty, and node ain't at end of list
    } else {
    	removedNode = this.getNodeAtIndex(index); // New node is the node we want to delete
      const after = removedNode.next // Set pointer for what comes next
      const before = removedNode.prev; // Set pointer for what comes before
    	removedNode.next = null; // Delete removed nodes pointer to next
      removedNode.prev = null; // Delete removed nodes pointer to previous
      before.next = after; // Set next pointer to what came after
      after.prev = before; // Set prev pointer to what came before
      this.length--; // Decrement list length
    }
    return removedNode; // Return removed node
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
let list = new DoubleLinkedList();

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
console.log("Node at index 2 changed to: " + list.setNodeAtIndex(2, 2).data);
