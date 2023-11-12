import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/term_model.dart';
import 'package:gym/params/term_params.dart';
import 'package:gym/repository/term_repository.dart';

final termProvider =
    StateNotifierProvider<TermProvider, List<TermModel>>((ref) {
  final repository = ref.watch(termRepositoryProvider);
  return TermProvider(repository: repository);
});

class TermProvider extends StateNotifier<List<TermModel>> {
  final TermRepository repository;

  TermProvider({
    required this.repository,
  }) : super([]) {
    getTerm(const TermParams());
  }

  Future<void> getTerm(TermParams term) async {
    final res = await repository.getTerm(termParams: term);
    state = res.items;
  }
}
