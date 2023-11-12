import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/discount_model.dart';
import 'package:gym/params/discount_params.dart';
import 'package:gym/repository/discount_repository.dart';

final discountProvider =
    StateNotifierProvider<DiscountProvider, List<DiscountModel>>((ref) {
  final repository = ref.watch(discountRepositoryProvider);
  return DiscountProvider(repository: repository);
});

class DiscountProvider extends StateNotifier<List<DiscountModel>> {
  final DiscountRepository repository;

  DiscountProvider({
    required this.repository,
  }) : super([]) {
    getDiscount(const DiscountParams());
  }

  Future<void> getDiscount(DiscountParams discount) async {
    final res = await repository.getDiscount(discountParams: discount);
    state = res.items;
  }
}
