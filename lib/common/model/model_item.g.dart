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
      t: (json['t'] as num).toDouble(),
      code: json['code'] as String,
      item: fromJsonT(json['item']),
      total: json['total'] as int,
    );

Map<String, dynamic> _$ModelWithItemToJson<T>(
  ModelWithItem<T> instance,
  Object? Function(T value) toJsonT,
) =>
    <String, dynamic>{
      't': instance.t,
      'code': instance.code,
      'item': toJsonT(instance.item),
      'total': instance.total,
    };
