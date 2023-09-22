// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ModelWithItem<T> _$ModelWithItemFromJson<T>(
  Map<String, dynamic> json,
  T Function(Object? json) fromJsonT,
) =>
    ModelWithItem<T>(
      code: json['code'] as String,
      item: fromJsonT(json['item']),
    );

Map<String, dynamic> _$ModelWithItemToJson<T>(
  ModelWithItem<T> instance,
  Object? Function(T value) toJsonT,
) =>
    <String, dynamic>{
      'code': instance.code,
      'item': toJsonT(instance.item),
    };
