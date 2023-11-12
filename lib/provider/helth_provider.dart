import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/helth_model.dart';
import 'package:gym/params/helth_params.dart';
import 'package:gym/repository/helth_repository.dart';

final helthProvider =
    StateNotifierProvider<HelthProvider, List<HelthModel>>((ref) {
  final repository = ref.watch(helthRepositoryProvider);
  return HelthProvider(repository: repository);
});

class HelthProvider extends StateNotifier<List<HelthModel>> {
  final HelthRepository repository;

  HelthProvider({
    required this.repository,
  }) : super([]) {
    getHelth(const HelthParams());
  }

  Future<void> getHelth(HelthParams helth) async {
    final res = await repository.getHelth(helthParams: helth);
    state = res.items;
  }
}
