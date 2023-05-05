/* Name: Stack With Single Linked List Data Structure Implementation
 * Author: Brandon Bays
 * Date: May 4 / 2023
 * Description: Simple Stack with single linked list implementation
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

// Stack Class - Works with LIFO (Last In First Out). Last in from front of list is first to leave
class Stack {
  // Constructor
  constructor() {
    this.first = null; // Set first value in stack to null
    this.last = null; // Set last value in stack to null
    this.size = 0; // Set size of stack to 0
  }

  // Look at next data on the stack
  peek() {
    if (this.isEmpty()) { // If the stack is empty 
      return null; // Return nothing
    }
    return this.first.data; // Otherwise return the data from the top of the stack
  }

  // Look whether the stack is empty
  isEmpty() {
    return this.size === 0; // Return true if stack size = 0;
  }

  // Get size of stack
  getSize() {
    return this.size; // Return stack size
  }

  // Push Method to add a new node to beginning of stack 
  push(data) {
    const newNode = new SingleLinkedListNode(data); // Create a new node
    // Case 1: Stack is empty
    if (!this.first) { // If stack is empty
      this.first = newNode; // Set the first to new node
      this.last = newNode; // Set the last to new node
    } else { // Case 2: List is not empty
    	let temp = this.first; // Temp variable to store the first variable in stack
      this.first = newNode; // Set the top of the stack to the new node
      this.first.next = temp; // Set new nodes next to the old head of stack
    }
    return this.size++; // Increment the stack size and return it
  }

  // Pop Method to remove the first item in stack
  pop() {
    // Case 1: If stack is empty
    if (!this.first) { // If stack is empty
      return false; // Nothing to return
    }
    // Case 2: Stack that will be left with only 1 node in it
    let removedNode = this.first; // Store top of stack temporarily
    if (this.first === this.last) { // If stack has only only 1 node
      this.last = null; // Set the last item in stack to null
    }
    // Case 3: Stack has more than 1 node left
    this.first = this.first.next; // Assign the top of stack to the next item in stack
    this.size--; // Decrement the stack size
    return removedNode.data; // Return removed stack data
  }

  // Display Stack Method
  displayStack(stack) {
    let tempStack = new Stack(); // Create a temporary stack to store the data from original stack 
    while (!stack.isEmpty()) { // Loop through the stack while it isn't empty
      tempStack.push(stack.pop()); // Copy all elements from the original stack to a temporary stack
    }
    let results = " "; // String to store data of elements
    while (!tempStack.isEmpty()) { // While the stack isn't empty
      let element = tempStack.pop(); // Pop the data off the stack and place into a place holder variable
      stack.push(element); // Now push the element onto the stack
      results += element + " "; // Append the data to the results string
    }
    return results; // Return results
  }
} // End Stack Class

// Main Program
let stack = new Stack();
console.log("Is the stack empty?");
console.log(stack.isEmpty());
console.log("Input some elements on the stack:")
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
console.log("Current stack: " + stack.displayStack(stack));
console.log("Top of the element of the stack:");
console.log(stack.peek());
console.log("Size of the stack:");
console.log(stack.getSize());
console.log("Remove one element from the stack:")
stack.pop();
stack.displayStack(stack);
console.log("Top of the element of the stack:");
console.log(stack.peek());
console.log("Is the stack empty?");
console.log(stack.isEmpty());
console.log("Size of the stack:");
console.log(stack.getSize());
