# 2d circle strip packing problem

The strip packing problem involves packing multiple circles into a strip with fixed width and unlimited length.

The aim is to find the proper circles' positions to minimize strip length.

For example, there are two possible packings of a set of 9 circles ("a", "b"). Packing "b" is denser and takes less strip length.

!["a" and "b" strip packings](./img/a_b_strip_packings.png)

## Solution description

Beam search is used to find an optimal solution.
To find the best circle placement beam search uses the MLDP procedure.

### Beam search

Beam search is a tree-based search algorithm. As an input, it takes starting node. Then, at each tree level for each node, it generates some child nodes and chooses (w - beam width) the best solutions among all the children nodes until it finds a feasible solution.
To generate a child node, it uses the MLDP procedure described below.

Nodes with the current minimum strip length are considered the best.

The starting node is one circle in the bottom left corner of a strip.

Implemented in `StripPackingBeamSearch`.

### The Minimum Local Distance Position (MLDP) procedure

The procedure aims to find a better position for a circle to place into a strip with some circles already placed. Let E is a set of already placed circles and bottom + left + top strip edge. Let P is a set of corner positions that are possible placements of a circle where it touches two elements (e1, e2) from E. The MLDP procedure chooses a corner position є P that has the nearest distance to an element є E (except e1, e2).

For example, the third circle will be placed at p3(1) because it has the nearest distance to circle 1 є E / { e1, e2 }.

![MLDP example](./img/mldp.png)

Implemented in `StripPackingState::placeNext`.

## Benchmarks

Benchmark input data are taken from http://www.packomania.com/cst/.

### SY 1, beam width = 1

Strip length: 20.2678332271892

![sy1_bw1](./example/simple_beam_search/output_sy1_bw1/result.png)

### SY 1, beam width = 100

Strip length: 19.141423250652664

![sy1_bw1000](./example/simple_beam_search/output_sy1_bw1000/result.png)

### SY 1, beam width = 5000

Strip length: 21.203990269569633

![sy1_bw5000](./example/simple_beam_search/output_sy1_bw5000/result.png)

### SY 565, beam width = 10

Strip length: 79.07653594472272

![sy565_bw10](./example/simple_beam_search/output_sy565_bw10/result.png)

## References

Algorithms and some figures are taken from the following article:

Akeb, H., Hifi, M., Lazure, D. (2013). A Heuristic Based Algorithm for the 2D Circular Strip Packing Problem. In: Fidanova, S. (eds) Recent Advances in Computational Optimization. Studies in Computational Intelligence, vol 470. Springer, Heidelberg. https://doi.org/10.1007/978-3-319-00410-5_5
