import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/order_model.dart';
import 'package:gym/params/order_params.dart';
import 'package:gym/repository/order_repository.dart';

final orderProvider =
    StateNotifierProvider<OrderProvider, List<OrderModel>>((ref) {
  final repository = ref.watch(orderRepositoryProvider);
  return OrderProvider(repository: repository);
});

class OrderProvider extends StateNotifier<List<OrderModel>> {
  final OrderRepository repository;

  OrderProvider({
    required this.repository,
  }) : super([]) {
    getOrder(const OrderParams());
  }

  Future<void> getOrder(OrderParams order) async {
    final res = await repository.getOrder(orderParams: order);
    state = res.items;
  }
}
