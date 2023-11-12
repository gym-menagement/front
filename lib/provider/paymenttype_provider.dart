import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/paymenttype_model.dart';
import 'package:gym/params/paymenttype_params.dart';
import 'package:gym/repository/paymenttype_repository.dart';

final paymenttypeProvider =
    StateNotifierProvider<PaymenttypeProvider, List<PaymenttypeModel>>((ref) {
  final repository = ref.watch(paymenttypeRepositoryProvider);
  return PaymenttypeProvider(repository: repository);
});

class PaymenttypeProvider extends StateNotifier<List<PaymenttypeModel>> {
  final PaymenttypeRepository repository;

  PaymenttypeProvider({
    required this.repository,
  }) : super([]) {
    getPaymenttype(const PaymenttypeParams());
  }

  Future<void> getPaymenttype(PaymenttypeParams paymenttype) async {
    final res = await repository.getPaymenttype(paymenttypeParams: paymenttype);
    state = res.items;
  }
}
