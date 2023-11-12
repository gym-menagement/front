import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/daytype_model.dart';
import 'package:gym/params/daytype_params.dart';
import 'package:gym/repository/daytype_repository.dart';

final daytypeProvider =
    StateNotifierProvider<DaytypeProvider, List<DaytypeModel>>((ref) {
  final repository = ref.watch(daytypeRepositoryProvider);
  return DaytypeProvider(repository: repository);
});

class DaytypeProvider extends StateNotifier<List<DaytypeModel>> {
  final DaytypeRepository repository;

  DaytypeProvider({
    required this.repository,
  }) : super([]) {
    getDaytype(const DaytypeParams());
  }

  Future<void> getDaytype(DaytypeParams daytype) async {
    final res = await repository.getDaytype(daytypeParams: daytype);
    state = res.items;
  }
}
