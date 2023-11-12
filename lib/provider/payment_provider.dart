import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/payment_model.dart';
import 'package:gym/params/payment_params.dart';
import 'package:gym/repository/payment_repository.dart';

final paymentProvider =
    StateNotifierProvider<PaymentProvider, List<PaymentModel>>((ref) {
  final repository = ref.watch(paymentRepositoryProvider);
  return PaymentProvider(repository: repository);
});

class PaymentProvider extends StateNotifier<List<PaymentModel>> {
  final PaymentRepository repository;

  PaymentProvider({
    required this.repository,
  }) : super([]) {
    getPayment(const PaymentParams());
  }

  Future<void> getPayment(PaymentParams payment) async {
    final res = await repository.getPayment(paymentParams: payment);
    state = res.items;
  }
}
