import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/paymentform_model.dart';
import 'package:gym/params/paymentform_params.dart';
import 'package:gym/repository/paymentform_repository.dart';

final paymentformProvider =
    StateNotifierProvider<PaymentformProvider, List<PaymentformModel>>((ref) {
  final repository = ref.watch(paymentformRepositoryProvider);
  return PaymentformProvider(repository: repository);
});

class PaymentformProvider extends StateNotifier<List<PaymentformModel>> {
  final PaymentformRepository repository;

  PaymentformProvider({
    required this.repository,
  }) : super([]) {
    getPaymentform(const PaymentformParams());
  }

  Future<void> getPaymentform(PaymentformParams paymentform) async {
    final res = await repository.getPaymentform(paymentformParams: paymentform);
    state = res.items;
  }
}
