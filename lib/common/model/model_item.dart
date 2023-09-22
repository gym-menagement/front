import 'package:json_annotation/json_annotation.dart';

part 'model_item.g.dart';

abstract class ModelWithItemBase {}

class ModelWithItemError extends ModelWithItemBase {
  final String message;

  ModelWithItemError({
    required this.message,
  });
}

class ModelWithItemLoading extends ModelWithItemBase {}

@JsonSerializable(
  genericArgumentFactories: true,
)
class ModelWithItem<T> extends ModelWithItemBase {
  // final double t;
  final String code;
  final T item;
  // final int total;

  ModelWithItem({
    // required this.t,
    required this.code,
    required this.item,
    // required this.total,
  });

  factory ModelWithItem.fromJson(
          Map<String, dynamic> json, T Function(Object? json) fromJsonT) =>
      _$ModelWithItemFromJson(json, fromJsonT);
}
