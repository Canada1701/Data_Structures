/* Name: Node Class for Linked Lists
 * Author: Brandon Bays
 * Date : May 3 / 2023
 * Description: A simple Node class for use with linked list data structures.
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
