import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/helthcategory_model.dart';
import 'package:gym/params/helthcategory_params.dart';
import 'package:gym/repository/helthcategory_repository.dart';

final helthcategoryProvider =
    StateNotifierProvider<HelthcategoryProvider, List<HelthcategoryModel>>((ref) {
  final repository = ref.watch(helthcategoryRepositoryProvider);
  return HelthcategoryProvider(repository: repository);
});

class HelthcategoryProvider extends StateNotifier<List<HelthcategoryModel>> {
  final HelthcategoryRepository repository;

  HelthcategoryProvider({
    required this.repository,
  }) : super([]) {
    getHelthcategory(const HelthcategoryParams());
  }

  Future<void> getHelthcategory(HelthcategoryParams helthcategory) async {
    final res = await repository.getHelthcategory(helthcategoryParams: helthcategory);
    state = res.items;
  }
}
