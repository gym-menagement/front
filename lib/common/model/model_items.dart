import 'package:json_annotation/json_annotation.dart';

part 'model_items.g.dart';

abstract class ModelWithItemsBase {}

class ModelWithItemsError extends ModelWithItemsBase {
  final String message;

  ModelWithItemsError({
    required this.message,
  });
}

class ModelWithItemsLoading extends ModelWithItemsBase {}

@JsonSerializable(
  genericArgumentFactories: true,
)
class ModelWithItems<T> extends ModelWithItemsBase {
  // final double t;
  final String code;
  final List<T> items;
  final int total;

  ModelWithItems({
    // required this.t,
    required this.code,
    required this.items,
    required this.total,
  });

  ModelWithItems copyWith({
    // double? t,
    String? code,
    List<T>? items,
    int? total,
  }) {
    return ModelWithItems(
      // t: t ?? this.t,
      code: code ?? this.code,
      items: items ?? this.items,
      total: total ?? this.total,
    );
  }

  factory ModelWithItems.fromJson(
          Map<String, dynamic> json, T Function(Object? json) fromJsonT) =>
      _$ModelWithItemsFromJson(json, fromJsonT);
}
