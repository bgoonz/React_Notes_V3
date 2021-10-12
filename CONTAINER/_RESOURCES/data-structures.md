# Bubble Sort

#### Problem Statement

Given an unsorted array of n elements, write a function to sort the array

#### Approach

- select the first element of the array
- compare it with its next element
- if it is larger than the next element then swap them
- else do nothing
- keep doing this for every index of the array
- repeat the above process n times.

#### Time Complexity

`O(n^2)` Worst case performance

`O(n)` Best-case performance

`O(n^2)` Average performance

#### Space Complexity

`O(1)` Worst case

#### Founder's Name

- The term "Bubble Sort" was first used by Iverson, K in 1962.

#### Example

```
arr[] = {10, 80, 40, 30}
Indexes: 0   1   2   3
```

1. Index = 0, Number = 10
1. 10 < 80, do nothing and continue
1. Index = 1, Number = 80
1. 80 > 40, swap 80 and 40
1. The array now is {10, 40, 80, 30}
1. Index = 2, Number = 80
1. 80 > 30, swap 80 and 30
1. The array now is {10, 40, 30, 80}

Repeat the Above Steps again

arr[] = {10, 40, 30, 80}
Indexes: 0 1 2 3

1. Index = 0, Number = 10
1. 10 < 40, do nothing and continue
1. Index = 1, Number = 40
1. 40 > 30, swap 40 and 30
1. The array now is {10, 30, 40, 80}
1. Index = 2, Number = 40
1. 40 < 80, do nothing
1. The array now is {10, 30, 40, 80}

Repeat the Above Steps again

arr[] = {10, 30, 40, 80}
Indexes: 0 1 2 3

1. Index = 0, Number = 10
1. 10 < 30, do nothing and continue
1. Index = 1, Number = 30
1. 30 < 40, do nothing and continue
1. Index = 2, Number = 40
1. 40 < 80, do nothing

Since there are no swaps in above steps, it means the array is sorted and we can stop here.

```

#### Code Implementation Links
```

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/BubbleSort.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/sorting/bubble_sort.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/sorts/bubble_sort.py)
- [C-Sharp](https://github.com/TheAlgorithms/C-Sharp/blob/master/Algorithms/Sorters/Comparison/BubbleSorter.cs)
- [Go](https://github.com/TheAlgorithms/Go/blob/master/sorts/bubblesort.go)
- [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/sorting/bubble_sort.rb)
- [C](https://github.com/TheAlgorithms/C/blob/master/sorting/bubble_sort.c)
- [Scala](https://github.com/TheAlgorithms/Scala/blob/master/src/main/scala/Sort/BubbleSort.scala)
- [Javascript](https://github.com/TheAlgorithms/Javascript/blob/master/Sorts/BubbleSort.js)

#### Video Explanation

[A video explaining the Bubble Sort Algorithm](https://www.youtube.com/watch?v=Jdtq5uKz-w4)

#### Others

Bubble sort is also known as Sinking sort.

#### Animation Explanation

- [Tute Board](https://boardhub.github.io/tute/?wd=bubbleSortAlgo2)

\# Caesar Cipher

The Caesar cipher is a simple cipher and one of the best known encryption algorithms. It is very simple to encrypt, decrypt and intercept. The Caesar cipher is a substitution cipher where each letter in the plain-text (decoded text) is replaced by a letter a certain number of spaces to the right of the letter in the alphabet. (The amount of spaces is called the key or shift and is only known by the sender and intended receiver).

\*\*Disclaimer: Do not attempt to encrypt personal data or serious messages with this cipher!!! It takes only half a second to crack by a computer!\*\*

- It takes a very small amount of time to encode and decode messages. (Less than a second, usually)

\3. No real applications exist for the cipher as it is the most insecure out there.

\4. This cipher was invented by Julius Caesar as a way to send messages of high military significance.

\## Steps

\### Encryption

1. Choose the alphabet you are going to use.
1. Choose a secret key (shift) that you are going to use in this case `n`.
1. For every letter in the plain-text, replace it by a letter of the alphabet that is `n` letters away from the letter. (Ex: for a key of `1`, `a` would become `b`, `z` would become `a`, etc.)
1. The message should now be encoded.

\### Decryption

1. Choose the alphabet that the message was encrypted with.
1. Let `n` be the secret key the message is encoded in.
1. For every letter in the cipher-text, replace it by a letter of the alphabet that is `n` letters behind in the alphabet from the letter.

`c` would be `b`, `a` would be `z` with a key of `1`.

1. The message should now be decoded

\## Example

\### An example of encryption

Let us say we are sending a secret message to a friend.

1. We first write out our message. In this case: `The Caesar cipher is a fun substitution cipher`
1. Our alphabet will be: `abcdefghijklmnopqrstuvwxyz`. For the uses of this tutorial, case doesn't matter. (On a shift of `1`: `A` will become `B`, `a` will become `b`)
1. Let our key be 6.
1. Starting with the first letter: `T`. The letter 6 letters away is `Z`. We add `Z` to the message.
1. The second letter is `h`. The letter 6 letters away is `n`. Our message is now `Zn`
1. We continue like that until the end. Our final message is: `Znk Igkygx iovnkx oy g lat yahyzozazout iovnkx.`
1. Decryption is the same way, except instead of going to the right in the alphabet, we go backwards.

\## Implementation

1. [Python](https://github.com/TheAlgorithms/Python/blob/master/ciphers/caesar_cipher.py)

# Coin Change

#### Problem Statement

Given a value `N`, if we want to make change for `N` cents, and we have infinite supply of each of `S = {S1, S2, .. , Sm}` valued coins, how many ways can we make the change? The order of coins doesnâ&euro;&trade;t matter.

#### Approach

Let the `dp[i]` be the length of the coin change of prefix `N[1..i]`. Our answer is `dp[N]`.
We fill `dp[0]` as 1 because there is only one way to get 0 coins (We pick no coins).

Now let's try calculate `dp[i]` for any `i`. `dp[0..i]` will store each sub problems from `0` to `N`. That's why the answer will be `dp[N]`. First, we need to iterate each coin types to pick them one-by-one. Then we iterate the sub problems from current coin that we pick before to `N` cents. That's why we must make dp table with `N` columns.

This is the codes for the Coin Change algorithm:

```
    for coin_val in S:
        for i in range(coin_val, n + 1):
            dp[i] += dp[i - coin_val]
```

In the second iteration, for every cent that can be exchanged, we take it by subtracting the i-th column by the value of the coin we take and adding it into the current column. So `dp[i]` will store the current sub problem.

#### Time Complexity

`O(N * S)` in any case

#### Space Complexity

`O(N)` - simple implementation. We only need 1D array to store the answer.

#### Example

Let's say we have 3 coin types `[1,2,3]` and we want to change for `7` cents. So we will define our table like this.

```
[1, 0, 0, 0, 0, 0, 0, 0]
```

0th column will store 1 since there is only one way to get 0 cents.

- For the first iteration we take a coin that has a value of 1. Then for all sub problems, there is only one way to make change. For 7 cents, the only way is `{1,1,1,1,1,1,1}`. On the final iteration, our table be like:

```
[1, 1, 1, 1, 1, 1, 1, 1]
```

- For the second iteration, we take a coin that has a value of 2. From here, all sub problems that can be divided by 2 will store another new way to make change. So, when the iteration stopped at 2nd column it will be like `dp[2] += dp[0]`. We know that `dp[0]` stored a value of 1. Thus, dp[2] will store the value of `1 + 1 = 2`. From here we know that for 2 cents, there are 2 ways `{1,1}` and `{2}`. And this operation will continue. Now our table be like:

```
[1, 1, 2, 2, 3, 3, 4, 4]
```

4 ways to make 7 cents using value of 1 and 2. `{{1,1,1,1,1,1,1}, {1,1,1,1,1,2}, {1,1,1,2,2}, {1,2,2,2}}`

- For the final iteration (3rd iteration), we take a coin that has a value of 3. Like before, now all the columns that can be devided by 3 will store another new way. And the final result will be like:

```
[1, 1, 2, 3, 4, 5, 7, 8]
```

So the final answer is **8**. 8 ways to make change of 7 cents using all coin types. `{{1,1,1,1,1,1,1}, {1,1,1,1,1,2}, {1,1,1,2,2}, {1,2,2,2}, {1,1,1,1,3}, {1,3,3}, {2,2,3}, {1,1,2,3}}`

#### Code Implementation Link

[Python](https://github.com/TheAlgorithms/Python/blob/master/dynamic_programming/coin_change.py)

#### Video Explanation

[Total Unique Ways To Make Change by Back To Back SWE](https://www.youtube.com/watch?v=DJ4a7cmjZY0)

\# Doubly Linked List

Singly Linked List is a linear and connected data structure made of Nodes. Each node is composed of a variable `data` where its content is stored and a pointer to the next Node on the list. The Linked List has a pointer to the first element of this Node sequence and may also have another pointer to the last Node to make operations at the far end less time-consuming. You can also store a `length` variable to store the total length.

A \*\*Doubly Linked List (DLL)\*\* contains an extra pointer, typically called previous pointer, together with next pointer and data which are there in singly linked list.

\### Advantages over singly linked list

- A DLL can be traversed in both forward and backward direction.
- The delete operation in DLL is more efficient if pointer to the node to be deleted is given.
- We can quickly insert a new node before a given node.

In singly linked list, to delete a node, pointer to the previous node is needed. To get this previous node, sometimes the list is traversed. In DLL, we can get the previous node using previous pointer.

\### Disadvantages over singly linked list

- Every node of DLL Require extra space for an previous pointer. It is possible to implement DLL with single pointer though (See this and this).
- All operations require an extra pointer previous to be maintained. For example, in insertion, we need to modify previous pointers together with next pointers. For example in following functions for insertions at different positions, we need 1 or 2 extra steps to set previous pointer.

\### Time Complexity

| Operation | Average | Worst |

\|-----------|---------|-------|

| Access | Θ(n) | O(n) |

| Search | Θ(n) | O(n) |

| Insertion | Θ(1) | O(1) |

| Deletion | Θ(1) | O(1) |

\## Example

\```java

class LinkedList {

Node head; // Pointer to the first element

` `Node tail; // Optional. Points to the last element

` `int length; // Optional

class Node {

int data; // Node data. Can be int, string, float, templates, etc

Node next; // Pointer to the next node on the list

Node prev;

Node(int data) {

this.data = data;

}

}

// Adding a node at the front of the list

public void push(int new_data) {

/\* 1. allocate node

1. 2. put in the data \*/

Node new_Node = new Node(new_data);

/\* 3. Make next of new node as head and previous as NULL \*/

new_Node.next = head;

new_Node.prev = null;

/\* 4. change prev of head node to new node \*/

if (head != null)

head.prev = new_Node;

/\* 5. move the head to point to the new node \*/

head = new_Node;

}

/\* Given a node as prev_node, insert a new node after the given node \*/

public void InsertAfter(Node prev_Node, int new_data) {

/\*1. check if the given prev_node is NULL \*/

if (prev_Node == null) {

System.out.println("The given previous node cannot be NULL ");

return;

}

/\* 2. allocate node

1. 3. put in the data \*/

Node new_node = new Node(new_data);

/\* 4. Make next of new node as next of prev_node \*/

new_node.next = prev_Node.next;

/\* 5. Make the next of prev_node as new_node \*/

prev_Node.next = new_node;

/\* 6. Make prev_node as previous of new_node \*/

new_node.prev = prev_Node;

/\* 7. Change previous of new_node's next node \*/

if (new_node.next != null)

new_node.next.prev = new_node;

}

}

\```

\### Adding node at front

![Tracing of algorithm](https://www.geeksforgeeks.org/wp-content/uploads/gq/2014/03/DLL_add_front1.png)

\### Add a node after a given node

![Tracing of algorithm](https://www.geeksforgeeks.org/wp-content/uploads/gq/2014/03/DLL_add_middle1.png)

\## Code Implementation Links

1. [Java](https://github.com/TheAlgorithms/Java/blob/master/DataStructures/Lists/DoublyLinkedList.java)
1. [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Data%20Structure/Doubly%20Linked%20List.cpp)
1. [Python](https://github.com/TheAlgorithms/Python/blob/master/data_structures/linked_list/doubly_linked_list.py)
1. [Go](https://github.com/TheAlgorithms/Go/blob/master/data-structures/linked-list/double-linkedlist.go)
1. [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/data_structures/linked_lists/double_list.rb)

\## Video Explanation

[A CS50 video explaining the Doubly Linked List Data Structure](https://www.youtube.com/watch?v=FHMPswJDCvU)

# Exponential Search

#### Prerequisites

- [Binary Search algorithm](https://github.com/faridevnz/Algorithms-Explanation/blob/master/en/Search%20Algorithms/Binary%20Search.md)

#### Problem Statement

Given a sorted array of _n_ elements, write a function to search for the index of a given element (target)

#### Approach

- Search for the **range** within which the target is included increasing _index_ by powers of 2
- If this range exists in array apply the Binary Search algorithm over it
- Else return -1

#### Example

```markdown
arr = [1, 2, 3, 4, 5, 6, 7, ... 998, 999, 1_000]

target = 998
index = 0
```

1. SEARCHING FOR THE RANGE
   index = 1, 2, 4, 8, 16, 32, 64, ..., 512, ..., 1_024
   after 10 iteration we have the index at 1_024 and outside of the array
1. BINARY SEARCH
   Now we can apply the binary search on the subarray from 512 and 1_000.

```

***Note***: we apply the Binary Search from 512 to 1_000 because at `i = 2^10 = 1_024` the array is finisced and the target number is less than the latest index of the array ( 1_000 ).

#### Time Complexity

**worst case:** `O(log *i*)` where `*i* = index` (position) of the target

**best case:** `O(*1*)`

#### Complexity Explanation
```

- The complexity of the first part of the algorithm is **O( log _i_ )** because if _i_ is the position of the target in the array, after doubling the search _index_ `⌈log(i)⌉` times, the algorithm will be at a search index that is greater than or equal to _i_. We can write `2^⌈log(i)⌉ >= i`
- The complexity of the second part of the algorithm also is **O ( log _i_ )** because that is a simple Binary Search. The Binary Search complexity ( as explained [here](https://github.com/faridevnz/Algorithms-Explanation/blob/master/en/Search%20Algorithms/Binary%20Search.md) ) is O( _n_ ) where _n_ is the length of the array. In the Exponential Search, the length of the array on which the algorithm is applied is `2^i - 2^(i-1)`, put into words it means '( the length of the array from start to _i_ ) - ( the part of array skipped until the previous iteration )'. Is simple verify that `2^i - 2^(i-1) = 2^(i-1) `

After this detailed explanation we can say that the the complexity of the Exponential Search is:

```mathematica
O(log i) + O(log i) = 2O(log i) = O(log i)
```

#### Binary Search vs Exponential Search

Let's take a look at this comparison with a less theoretical example. Imagine we have an array with`1_000_000` elements and we want to search an element that is in the `4th` position. It's easy to see that:

- The Binary Search start from the middle of the array and arrive to the 4th position after many iterations
- The Exponential Search arrive at the 4th index after only 2 iterations

#### Code Implementation Links

- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/search/exponential_search.cpp)
- [JavaScript](https://github.com/TheAlgorithms/Javascript/blob/master/Search/ExponentialSearch.js)

# Calculating Fibonacci numbers

In mathematics, the Fibonacci numbers commonly denoted F(n), form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. The Sequence looks like this:

`[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...]`

## Applications

Finding
`N-th` member of this sequence would be useful in many Applications:

- Recently Fibonacci sequence and the golden ratio are of great interest to researchers in many fields of
  science including high energy physics, quantum mechanics, Cryptography and Coding.

## Steps

1. Prepare Base Matrice
1. Calculate the power of this Matrice
1. Take Corresponding value from Matrix

## Example

Find `8-th` member of Fibonacci

### Step 0

```
| F(n+1)  F(n)  |
| F(n)    F(n-1)|
```

### Step 1

```
Calculate matrix^1
| 1 1 |
| 1 0 |
```

### Step 2

```
Calculate matrix^2
| 2 1 |
| 1 1 |
```

### Step 3

```
Calculate matrix^4
| 5 3 |
| 3 2 |
```

### Step 4

```
Calculate matrix^8
| 34 21 |
| 21 13 |
```

### Step 5

F(8)=21

## Implementation

- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/math/fibonacci.cpp)
- [Java](https://github.com/TheAlgorithms/Java/blob/master/Maths/FibonacciNumber.java)
- [Javascript](https://github.com/TheAlgorithms/Javascript/blob/80c2dc85d714f73783f133964d6acd9b5625ddd9/Maths/Fibonacci.js)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/maths/fibonacci.py)

## Video URL

- [Youtube](https://www.youtube.com/watch?v=EEb6JP3NXBI)

## Others

- [Proof](https://brilliant.org/wiki/fast-fibonacci-transform/)

# Average (Mean)

Calculate the average of a list of numbers using mean.

## Applications

Calculating the mean of a list of numbers is one of the most common ways to
determine the average of those numbers.

Calculating a mean would be useful in these situations:

- Determining the average score for all players of a video game level.
- Finding the average grade for tests that a student took this semester.
- Determining the average size of all files in a directory/folder.

## Steps

1. Input a list of numbers.
1. Calculate the sum of all numbers in the list.
1. Count the numbers in the list.
1. Divide the sum by the total count of numbers in the list.
1. Return mean.

## Example

Given the list `[2, 4, 6, 8, 20, 50, 70]`, let's calculate the average.

### Step 1

Send `[2, 4, 6, 8, 20, 50, 70]` as input for a method/function.

### Step 2

Add all the numbers together.

`2 + 4 + 6 + 8 + 20 + 50 + 70 = 160`, so `sum = 160`.

### Step 3

Count the numbers in the list.

The list has seven numbers, so `count = 7`.

### Step 4

Divide the sum of all the numbers by the count of the numbers.

```
sum = 160
count = 7
```

If we ignore significant digits: `sum / count = `22.<u>857142</u>

If we properly consider significant digits: `sum / count = 23`

### Step 5

Return the value of 22.<u>857142</u> or `23`.

## Implementation

- [Python](https://github.com/TheAlgorithms/Python/blob/master/maths/average_mean.py)

## Video URL

- [Mean on Khan Academy](https://www.khanacademy.org/math/ap-statistics/summarizing-quantitative-data-ap/measuring-center-quantitative/v/mean-median-and-mode)

## Others

- [Mean on Wikipedia](https://en.wikipedia.org/wiki/Mean)

# Bellman-Ford

#### Problem Statement

Given a weighted directed graph G(V,E) and a source vertex s ∈ V, determine for each vertex v ∈ V the shortest path between s and v.

#### Approach

- Initialize the distance from the source to all vertices as infinite.
- Initialize the distance to itself as 0.
- Create an array dist[] of size |V| with all values as infinite except dist[s].
- Repeat the following |V| - 1 times. Where |V| is number of vertices.
- Create another loop to go through each edge (u, v) in E and do the following:

  dist[v] = minimum(dist[v], dist[u] + weight of edge).

- Lastly iterate through all edges on last time to make sure there are no negatively weighted cycles.

#### Time Complexity

O(VE)

#### Space Complexity

O(V^2)

#### Founder's Name

- Richard Bellman & Lester Ford, Jr.

#### Example

```
    # of vertices in graph = 5 [A, B, C, D, E]
    # of edges in graph = 8

    edges  [A->B, A->C, B->C, B->D, B->E, D->C, D->B, E->D]
    weight [ -1,    4,    3,    2,    2,    5,    1,   -4 ]
    source [  A,    A,    B,    B,    B,    D,    D,    E ]



    // edge A->B
    graph->edge[0].src = A
    graph->edge[0].dest = B
    graph->edge[0].weight = -1

    // edge A->C
    graph->edge[1].src = A
    graph->edge[1].dest = C
    graph->edge[1].weight = 4

    // edge B->C
    graph->edge[2].src = B
    graph->edge[2].dest = C
    graph->edge[2].weight = 3

    // edge B->D
    graph->edge[3].src = B
    graph->edge[3].dest = D
    graph->edge[3].weight = 2

    // edge B->E
    graph->edge[4].src = B
    graph->edge[4].dest = E
    graph->edge[4].weight = 2

    // edge D->C
    graph->edge[5].src = D
    graph->edge[5].dest = C
    graph->edge[5].weight = 5

    // edge D->B
    graph->edge[6].src = D
    graph->edge[6].dest = B
    graph->edge[6].weight = 1

    // edge E->D
    graph->edge[7].src = E
    graph->edge[7].dest = D
    graph->edge[7].weight = -3

    for source = A

    Vertex   Distance from Source
  A                0        A->A
  B                -1        A->B
  C                2         A->B->C = -1 + 3
  D                -2        A->B->E->D = -1 + 2 + -3
  E                1        A->B->E = -1 + 2
```

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/DataStructures/Graphs/BellmanFord.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Dynamic%20Programming/Bellman-Ford.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/data_structures/graph/bellman_ford.py)
- [C](https://github.com/TheAlgorithms/C/blob/master/data_structures/graphs/Bellman-Ford.c)

#### Video Explanation

[A video explaining the Bellman-Ford Algorithm](https://www.youtube.com/watch?v=hxMWBBCpR6A)

#### Others

Sources Used:

- https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/
- https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford\_algorithm

\# Binary Search (A divide and conquer algorithm)

\#### Problem Statement

Given a sorted array of n elements, write a function to search for the index of a given element (target)

\#### Approach

- Search for the array by dividing the array in half repeatedly.
- Initially consider the actual array and pick the element at the middle index
- Keep a lower index i.e. 0 and higher index i.e. length of array
- If it is equal to the target element then return the index
- Else if it is greater than the target element then consider only the left half of array. (lower index = 0, higher = middle - 1)
- Else if it is less than the target element then consider only the right half of array. (lower index = middle + 1, higher = length of array)
- Return -1 if target element is not found in the array (Base Case: If lower index is greater than or equal to higher index)

\#### Time Complexity

O(log n) Worse Case

O(1) Best Case (If middle element of initial array is the target element)

\#### Space Complexity

O(1) For iterative approach

O(log n) For recursive approach due to recursion call stack

\#### Example

\```

arr = [1,2,3,4,5,6,7]

target = 2

Initially the element at middle index is 4 which is greater than 2. Therefore we search the left half of the

array i.e. [1,2,3].

Here we find the middle element equal to target element so we return its index i.e. 1

target = 9

Binary Search should return -1 as 9 is not present in the array

\```

\#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Searches/BinarySearch.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Search/Binary%20Search.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/searches/binary_search.py)
- [C-Sharp](https://github.com/TheAlgorithms/C-Sharp/blob/master/searches/binary_search.cs)
- [C](https://github.com/TheAlgorithms/C/blob/master/searching/Binary_Search.c)

\#### Video Explanation

[A CS50 video explaining the Binary Search Algorithm](https://www.youtube.com/watch?v=5xlIPT1FRcA)

\#### Animation Explanation

- [Tute Board](https://boardhub.github.io/tute/?wd=binarySearchAlgo2)

\# Radix Sort

The lower bound for Comparison based sorting algorithm (Merge Sort, Heap Sort, Quick-Sort .. etc) is `Ω(nlogn)`, i.e., they cannot do better than `nlogn`.

Counting sort is a linear time sorting algorithm that sort in `O(n+k)` time when elements are in the range from 1 to k.

What if the elements are in the range from 1 to n2? We can't use counting sort because counting sort will take `O(n2)` which is worse than comparison-based sorting algorithms. Can we sort such an array in linear time?

Radix Sort is the answer. The idea of Radix Sort is to do digit by digit sort starting from least significant digit to most significant digit. Radix sort uses counting sort as a subroutine to sort.

\## The Radix Sort Algorithm

Do following for each digit i where i varies from least significant digit to the most significant digit.

Sort input array using counting sort (or any stable sort) according to the i'th digit.

Example:

Original, unsorted list:

`170, 45, 75, 90, 802, 24, 2, 66`

Sorting by least significant digit (1s place) gives:

[\*Notice that we keep 802 before 2, because 802 occurred

before 2 in the original list, and similarly for pairs

170 & 90 and 45 & 75.]

Sorting by next digit (10s place) gives:

[\*Notice that 802 again comes before 2 as 802 comes before 2 in the previous list.]

`802, 2, 24, 45, 66, 170, 75, 90`

Sorting by the most significant digit (100s place) gives:

`2, 24, 45, 66, 75, 90, 170, 802`

\## What is the running time of Radix Sort?

Let there be d digits in input integers. Radix Sort takes `O(d\*(n+b))` time where b is the base for representing numbers, for example, for the decimal system, b is 10.

What is the value of d? If `k` is the maximum possible value, then d would be `O(logb(k))`. So overall time complexity is `O((n+b) \* logb(k))`. Which looks more than the

time complexity of comparison-based sorting algorithms for a large k. Let us first limit k. Let k <= nc where c is a constant. In that case, the complexity becomes

`O(n logb(n))`. But it still doesn't beat comparison-based sorting algorithms.

\## Is Radix Sort preferable to Comparison based sorting algorithms like Quick-Sort?

If we have `log2n` bits for every digit, the running time of Radix appears to be better than Quick Sort for a wide range of input numbers. The constant factors hidden in

asymptotic notation are higher for Radix Sort and Quick-Sort uses hardware caches more effectively. Also, Radix sort uses counting sort as a subroutine and counting sort

takes extra space to sort numbers.

Video reference: https://youtu.be/nu4gDuFabIM

# Recursive Bubble Sort

Bubble Sort is one of the simplest sorting algorithms that compares two elements at a time and swaps them if they are in the wrong order. This process is repeated until the entire sequence is in order.

- Time Complexity: `O(n ^ 2)` for average case; `O(n)` for best case.
- Space Complexity: `O(n)`; note that iterative bubble sort has space complexity as `O(1)`.

## Steps

Base case: If the size of the array is 1, return.

- We need to fix the last element of the current sub-array. For this, iterate over the entire array using normal Bubble Sort, and perform swapping.
- Next, call the function on the entire array excluding the last element(which was fixed by the iteration in the above step)
- Repeat until Base Case is reached.

## Example

Let the given array be: `{5, 3, 2, 1, 4}`

**First Iteration:**

- {`5`, `3`, 2, 1, 4} -> {`3`, `5`, 2, 1, 4} Swap since `5 > 3`
- {3, `5`, `2`, 1, 4} -> {3, `2`, `5`, 1, 4} Swap since `5 > 2`
- {3, 2, `5`, `1`, 4} -> {3, 2, `1`, `5`, 4} Swap since `5 > 1`
- {3, 2, 1, `5`, `4`} -> {3, 2, 1, `4`, `5`} Swap since `5 > 4`

This iteration has fixed the position of 5. Now, we will consider the array up to index 3.

**Second Iteration:**

- {`3`, `2`, 1, 4, 5} -> {`2`, `3`, 1, 4, 5} Swap since `3 > 2`
- {2, `3`, `1`, 4, 5} -> {2, `1`, `3`, 4, 5} Swap since `3 > 1`
- {2, 1, `3`, `4`, 5}; As `3 < 4`, do not swap

Note: As we check one less element with every iteration, we do not need elements at index 3 and 4 i.e., `4` and `5`, as 5 is already in order. Formally, for an array with `n` integers, we consider elements only up to index `n - i`, where `i` is the iteration number.

**Third Iteration:**

- {`2`, `1`, 3, 4, 5} -> {`1`, `2`, 3, 4, 5} Swap since `1 > 2`
- {1, `2`, `3`, 4, 5}; As `2 < 3`, do not swap

**Fourth Iteration:**

- {`1`, `2`, 3, 4, 5}; As `1 < 2`, do not swap

**Fifth Iteration:**

- {`1`, 2, 3, 4, 5}; As the size of the array is 1, return.

Note: This is the base case.

## Pseudo Code

```
void bubbleSort(arr[], n)
    if(n==1)
        return;

    for(i = 0; i<n-1; i++)
        if(arr[i] > arr[i+1])
            swap(arr[i], arr[i+1])

    bubbleSort(arr, n-1)
```

## Implementations

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/BubbleSortRecursion.java)
- [C](https://github.com/TheAlgorithms/C/blob/master/sorting/bubble_sort_recursion.c)

## Video Explanation

[A video explaining iterative as well as recursive bubble sort](https://www.youtube.com/watch?v=gDMDVLBfCI0)

# Selection Sort

#### Problem Statement

Given an unsorted array of n elements, write a function to sort the array

#### Approach

- select the smallest element from the array
- put it at the beginning of the array
- then select the smallest array from the remaining unsorted list
- append it to the sorted array at the beginning
- keep doing this for every element of the array
- repeat the above process n times

#### Time Complexity

`O(n^2)` Worst case performance

`O(n^2)` Best-case performance

`O(n^2)` Average performance

#### Space Complexity

`O(1)` Worst case

#### Example

```
arr[] = {80, 10, 40, 30}
Indexes: 0   1   2   3
```

1. Index = 0
   Select the minimum number from the array (between index 0-3), ie, 10
1. Swap 10 and 80 (arr[0])
1. The array now is {10, 80, 40, 30}
1. Index = 1
   Select the minimum number from the array (between index 1-3), ie, 30
1. Swap 30 and 80 (arr[1])
1. The array now is {10, 30, 40, 80}
1. Index = 2
   Select the minimum number from the array (between index 2-3), ie, 40
1. Swap 40 and 40 (arr[2])
1. The array now is {10, 30, 40, 80}

The array is now sorted.

```

#### Code Implementation Links
```

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/SelectionSort.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Sorting/Selection%20Sort.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/sorts/selection_sort.py)
- [Go](https://github.com/TheAlgorithms/Go/blob/master/sorts/selection_sort.go)
- [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/Sorting/selection_sort.rb)
- [C](https://github.com/TheAlgorithms/C/blob/master/sorting/SelectionSort.c)
- [Scala](https://github.com/TheAlgorithms/Scala/blob/master/src/main/scala/Sort/SelectionSort.scala)
- [Javascript](https://github.com/TheAlgorithms/Javascript/blob/master/Sorts/selectionSort.js)

#### Video Explanation

[A video explaining the Selection Sort Algorithm](https://www.youtube.com/watch?v=f8hXR_Hvybo)

#### Animation Explanation

- [Tute Board](https://boardhub.github.io/tute/?wd=selectSortAlgo2)

# Harris Detector

## Problem Statement

Detect corners and edges in a given image.

## Approach

Given image $I$, $n\times n$ size Gaussian Kernel $G\_{n\times n}$,

1. Compute the gradients of the image, both horizontal and vertical directions. $X=(-1, 0, 1)\otimes I$, $Y=(-1, 0, 1)^T \otimes I$
1. Compute the matrix $M$, where $A = G\_{n\times n} \otimes X^2$, $B=G\_{n\times n}\otimes Y^2$, $C=G\_{n\times n}\otimes XY$
1. Compute the response function $R$, where $R=AB-C^2-k(A+B)$
1. Classify all points in $R​$.

## Code Implementation Links

1. [Python](https://github.com/TheAlgorithms/Python/blob/master/digital_image_processing/feature_detectors/harris.py)

## Reference

C. Harris and M. Stephens, "A Combined Corner and Edge Detector," in _Procedings of the Alvey Vision Conference 1988_, Manchester, 1988, pp. 23.1-23.6.

# Heap Sort

#### Problem Statement

Given an unsorted array of n elements, write a function to sort the array

#### Approach

- Build a max heap from the input data.
- At this point, the largest item is stored at the root of the heap. Replace it with the last item of the heap followed by reducing the size of heap by 1. Finally, heapify the root of tree.
- Repeat above steps while size of heap is greater than 1.

#### Time Complexity

`O(n log n)` Worst case performance

`O(n log n)` (distinct keys)
or O(n) (equal keys) Best-case performance

`O(n log n)` Average performance

#### Space Complexity

`O(1)` Worst case auxiliary

#### Example

```
Input data: 4, 10, 3, 5, 1
        4(0)
       /   \
    10(1)   3(2)
   /   \
5(3)    1(4)

The numbers in bracket represent the indices in the array
representation of data.

Applying heapify procedure to index 1:
        4(0)
       /   \
   10(1)    3(2)
   /   \
5(3)    1(4)

Applying heapify procedure to index 0:
       10(0)
       /  \
    5(1)  3(2)
   /   \
4(3)    1(4)
The heapify procedure calls itself recursively to build heap
in top down manner.
```

![heap-image](https://upload.wikimedia.org/wikipedia/commons/1/1b/Sorting_heapsort_anim.gif "Heap Sort")

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/HeapSort.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/sorting/heap_sort.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/sorts/heap_sort.py)
- [Go](https://github.com/TheAlgorithms/Go/blob/master/sorts/heapsort.go)
- [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/sorting/heap_sort.rb)
- [C-sharp](https://github.com/TheAlgorithms/C-Sharp/blob/master/Algorithms/Sorters/Comparison/HeapSorter.cs)
- [C](https://github.com/TheAlgorithms/C/blob/master/sorting/heap_sort.c)
- [Javascript](https://github.com/TheAlgorithms/Javascript/blob/master/Sorts/HeapSort.js)

#### Video Explanation

[A video explaining the Selection Sort Algorithm](https://www.youtube.com/watch?v=MtQL_ll5KhQ)

# Insertion Sort

#### Problem Statement

Given an array of n elements, write a function to sort the array in increasing order.

#### Approach

- Define a "key" index, the subarray to the left of which is sorted.
- Initiate "key" as 1, ie. the second element of array(as there is only one element to left of the second element, which can be considered as sorted array with one element).
- If value of element at (key - 1) position is less than value of element at (key) position; increment "key".
- Else move elements of sorted subarray that are greater than value of element at "key" to one position ahead of their current position. Put the value of element at "key" in the newly created void.

#### Time Complexity

- `О(n^2)` comparisons, `О(n^2)` swaps -- Worst Case
- `O(n)` comparisons, `O(1)` swaps -- Best Case

#### Space Complexity

`O(1)` -- (No extra space needed, sorting done in place)

#### Example

```

12, 11, 13, 5, 6

Let us loop for i = 1 (second element of the array) to 4 (Size of input array)

i = 1.
Since 11 is smaller than 12, move 12 and insert 11 before 12
11, 12, 13, 5, 6

i = 2.
13 will remain at its position as all elements in sorted subarray are smaller than 13
11, 12, 13, 5, 6

i = 3.
5 will move to the beginning,
and all other elements from 11 to 13 will move one position ahead of their current position.
5, 11, 12, 13, 6

i = 4.
6 will move to position after 5,
and elements from 11 to 13 will move one position ahead of their current position.
5, 6, 11, 12, 13  -- sorted array
```

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/InsertionSort.java)
- [C](https://github.com/TheAlgorithms/C/blob/master/sorting/insertion_sort.c)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/sorting/insertion_sort.cpp)
- [C#](https://github.com/TheAlgorithms/C-Sharp/blob/master/Algorithms/Sorters/Comparison/InsertionSorter.cs)
- [Scala](https://github.com/TheAlgorithms/Scala/blob/master/src/main/scala/Sort/InsertionSort.scala)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/sorts/insertion_sort.py)
- [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/sorting/insertion_sort.rb)

#### Video Explanation

[A CS50 video explaining the Insertion Search Algorithm](https://www.youtube.com/watch?v=DFG-XuyPYUQ)

# Linear Search

#### Problem Statement

Given an array of n elements, write a function to search for the index of a given element (target)

#### Approach

- Start iterating with the first element in the array.
- Compare it with the target element
- If it is equal to the target element then return the index
- Else continue iterating
- Return -1 if target element is not found in the array

#### Time Complexity

O(n) Worse Case
O(1) Best Case (If first element of array is the target element)

#### Space Complexity

O(1)

#### Example

```
arr = [1, 3, 9, 5, 0, 2]

target = 5
Linear Search should return index 3 as 5 is on index 3

target = 6
Linear Search should return -1 as 6 is not present in the array
```

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Searches/LinearSearch.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Search/Linear%20Search.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/searches/linear_search.py)

#### Video Explanation

[A CS50 video explaining the Linear Search Algorithm](https://www.youtube.com/watch?v=CX2CYIJLwfg)

#### Animation Explanation

- [Tute Board](https://boardhub.github.io/tute/?wd=linearSearchAlgo)

# Longest Common Subsequence

#### Problem Statement

Given two strings `S` and `T`, find the length of the longest common subsequence (<b>LCS</b>).

#### Approach

Let the `dp[i][j]` be the length of the longest common subsequence of prefixes `S[1..i]` and `T[1..j]`. Our answer (the length of LCS) is `dp[|S|][|T|]` since the prefix of the length of string is the string itself.

Both `dp[0][i]` and `dp[i][0]` are `0` for any `i` since the LCS of empty prefix and anything else is an empty string.

Now let's try to calculate `dp[i][j]` for any `i`, `j`. Let's say `S[1..i] = *A` and `T[1..j] = *B` where `*` stands for any sequence of letters (could be different for `S` and `T`), `A` stands for any letter and `B` stands for any letter different from `A`. Since `A != B`, our LCS doesn't include `A` or `B` as a last character. So we could try to throw away `A` or `B` character. If we throw `A`, our LCS length will be `dp[i - 1][j]` (since we have prefixes `S[1..i - 1]` and `T[1..j]`). If we try to throw `B` character, we will have prefixes `S[1..i]` and `T[1..j - 1]` so the length of LCS will be `dp[i][j - 1]`. As we are looking for the <b>Longest</b> common subsequence, we will pick <b>the maximum value</b> from `dp[i][j - 1]` and `dp[i - 1][j]`.

But what if `S[1..i] = *A` and `T[1..j] = *A`? We could say that the LCS of our prefixes is LCS of prefixes `S[1..i - 1]` and `T[1..j - 1]` <b>plus</b> the letter `A`. So `dp[i][j] = dp[i - 1][j - 1] + 1` if `S[i] = T[j]`.

We could see that we can fill our `dp` table row by row, column by column. So our algorithm will be like:

- Let's say that we have strings `S` of the length N and `T` of the length M (numbered from 1). Let's create the table `dp` of size `(N + 1) x (M + 1)` numbered from 0.
- Let's fill the 0th row and the 0th column of `dp` with 0.
- Then, we follow the algorithm:

```
for i in range(1..N):
    for j in range(1..M):
        if(S[i] == T[j])
            dp[i][j] = dp[i - 1][j - 1] + 1
        else
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
```

#### Time Complexity

`O(N * M)` In any case

#### Space Complexity

`O(N * M)` - simple implementation
`O(min {N, M})` - two-layers implementation (as `dp[i][j]` depends on only i-th and i-th layers, we coudld store only two layers).

#### Example

Let's say we have strings `ABCB` and `BBCB`. We will build such a table:

```
# # A B C B
# 0 0 0 0 0
B 0 ? ? ? ?
B 0 ? ? ? ?
C 0 ? ? ? ?
B 0 ? ? ? ?
```

Now we will start to fill our table from 1st row. Since `S[1] = A` and `T[1] = B`, the `dp[1][1]` will be tha maximal value of `dp[0][1] = 0` and `dp[1][0] = 0`. So `dp[1][1] = 0`. But now `S[2] = B = T[1]`, so `dp[1][2] = dp[0][1] + 1 = 1`. `dp[1][3]` is `1` since `A != C` and we pick `max{dp[1][2], dp[0][3]}`. And `dp[1][4] = dp[0][3] + 1 = 1`.

```
# # A B C B
# 0 0 0 0 0
B 0 0 1 1 1
B 0 ? ? ? ?
C 0 ? ? ? ?
B 0 ? ? ? ?
```

Now let's fill the other part of the table:

```
# # A B C B
# 0 0 0 0 0
B 0 0 1 1 1
B 0 0 1 1 2
C 0 0 1 2 2
B 0 0 1 2 3
```

So the length of LCS is `dp[4][4] = 3`.

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Dynamic%20Programming/LongestCommonSubsequence.java)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/dynamic_programming/longest_common_subsequence.py)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Dynamic%20Programming/Longest%20Common%20Subsequence.cpp)

#### Video Explanation

[Video explanation by Tushar Roy](https://youtu.be/NnD96abizww)

# Merge Sort (Divide and Conquer Algorithm)

#### Problem Statement

Given an array of n elements, write a function to sort the array

#### Approach

- Find a mid point and divide the array into to halves based on the mid point
- Recursively call the merge sort function for both the halves
- Merge the two sorted halves to get the sorted array

#### Time Complexity

`O(n log n)`

#### Space Complexity

`O(n)`

#### Example

```
arr = [1, 3, 9, 5, 0, 2]

Divide the array in two halves [1, 3, 9] and [5, 0, 2]

Recursively call merge sort function for both these halves which will provide sorted halves
=> [1, 3, 9] & [0, 2, 5]

Now merge both these halves to get the sorted array [0, 1, 2, 3, 5, 9]
```

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/MergeSort.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/sorting/merge_sort.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/sorts/merge_sort.py)
- [C-Sharp](https://github.com/TheAlgorithms/C-Sharp/blob/master/Algorithms/Sorters/Comparison/MergeSorter.cs)
- [C](https://github.com/TheAlgorithms/C/blob/master/sorting/merge_sort.c)
- [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/sorting/merge_sort.rb)

#### Video Explanation

[A CS50 video explaining the Merge Sort Algorithm](https://www.youtube.com/watch?v=EeQ8pwjQxTM)

# Quick Sort

#### Problem Statement

Given an unsorted array of n elements, write a function to sort the array

#### Approach

- Make the right-most index value pivot
- partition the array using pivot value
- quicksort left partition recursively
- quicksort right partition recursively

#### Time Complexity

- `O(n^2)` Worst case performance
- `O(n log n)` Best-case performance
- `O(n log n)` Average performance

#### Space Complexity

`O(log n)` Worst case

#### Founder's Name

Tony Hoare in 1959

#### Example

```
arr[] = {10, 80, 30, 90, 40, 50, 70}
Indexes:  0   1   2   3   4   5   6

low = 0, high =  6, pivot = arr[h] = 70
Initialize index of smaller element, i = -1

Traverse elements from j = low to high-1
j = 0 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
i = 0
arr[] = {10, 80, 30, 90, 40, 50, 70} // No change as i and j
                                     // are same

j = 1 : Since arr[j] > pivot, do nothing
// No change in i and arr[]

j = 2 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
i = 1
arr[] = {10, 30, 80, 90, 40, 50, 70} // We swap 80 and 30

j = 3 : Since arr[j] > pivot, do nothing
// No change in i and arr[]

j = 4 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
i = 2
arr[] = {10, 30, 40, 90, 80, 50, 70} // 80 and 40 Swapped
j = 5 : Since arr[j] <= pivot, do i++ and swap arr[i] with arr[j]
i = 3
arr[] = {10, 30, 40, 50, 80, 90, 70} // 90 and 50 Swapped

We come out of loop because j is now equal to high-1.
Finally we place pivot at correct position by swapping
arr[i+1] and arr[high] (or pivot)
arr[] = {10, 30, 40, 50, 70, 90, 80} // 80 and 70 Swapped

Now 70 is at its correct place. All elements smaller than
70 are before it and all elements greater than 70 are after
it.
```

#### Code Implementation Links

- [Java](https://github.com/TheAlgorithms/Java/blob/master/Sorts/QuickSort.java)
- [C++](https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/Sorting/Quick%20Sort.cpp)
- [Python](https://github.com/TheAlgorithms/Python/blob/master/sorts/quick_sort.py)
- [Ruby](https://github.com/TheAlgorithms/Ruby/blob/master/sorting/quicksort.rb)

#### Video Explanation

[A video explaining the Quick Sort Algorithm](https://www.youtube.com/watch?v=COk73cpQbFQ)
